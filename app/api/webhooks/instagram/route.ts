import { NextResponse } from "next/server";
import { verifyWebhookSignature, sendDirectMessageReply, sendCommentReply } from "@/lib/instagram";
import { INSTAGRAM_AUTO_REPLY } from "@/lib/config";

/**
 * Instagram automation: auto-replies to DMs and post comments.
 *
 * Setup (Meta for Developers -> your app -> Instagram -> Webhooks):
 * 1. Connect your Instagram professional account to a Facebook Page, then
 *    create a Meta app and add the "Instagram" product.
 * 2. Generate a long-lived access token for the account with the
 *    instagram_business_basic, instagram_business_manage_messages, and
 *    instagram_business_manage_comments permissions. Set it as
 *    INSTAGRAM_ACCESS_TOKEN.
 * 3. Set INSTAGRAM_APP_SECRET (from the app's Basic Settings) and choose
 *    your own INSTAGRAM_VERIFY_TOKEN (any random string you pick).
 * 4. In the app's Webhooks config, subscribe to the "messages" and
 *    "comments" fields, pointing at <site>/api/webhooks/instagram, using
 *    INSTAGRAM_VERIFY_TOKEN as the verify token — Meta calls the GET
 *    handler below once to confirm you control the endpoint.
 *
 * Auto-reply wording lives in INSTAGRAM_AUTO_REPLY (lib/config.ts), not
 * here — edit that to change what gets sent.
 */

/** Meta's one-time webhook verification handshake. */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("hub.mode");
  const token = searchParams.get("hub.verify_token");
  const challenge = searchParams.get("hub.challenge");

  if (mode === "subscribe" && token === process.env.INSTAGRAM_VERIFY_TOKEN && challenge) {
    return new NextResponse(challenge, { status: 200 });
  }

  return new NextResponse("Forbidden", { status: 403 });
}

type MessagingEntry = {
  sender?: { id?: string };
  message?: { text?: string; is_echo?: boolean };
};

type CommentChange = {
  field?: string;
  value?: { id?: string; text?: string; from?: { id?: string } };
};

type WebhookEntry = {
  messaging?: MessagingEntry[];
  changes?: CommentChange[];
};

export async function POST(request: Request) {
  const rawBody = await request.text();
  const signature = request.headers.get("x-hub-signature-256");

  if (!verifyWebhookSignature(rawBody, signature)) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }

  let payload: { entry?: WebhookEntry[] };
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  for (const entry of payload.entry ?? []) {
    for (const event of entry.messaging ?? []) {
      // is_echo marks our own outgoing messages being reflected back —
      // replying to those would create an infinite loop.
      if (event.message?.is_echo) continue;
      const senderId = event.sender?.id;
      if (senderId && event.message?.text) {
        await sendDirectMessageReply(senderId, INSTAGRAM_AUTO_REPLY.directMessage);
      }
    }

    for (const change of entry.changes ?? []) {
      if (change.field !== "comments") continue;
      const commentId = change.value?.id;
      if (commentId) {
        await sendCommentReply(commentId, INSTAGRAM_AUTO_REPLY.comment);
      }
    }
  }

  return NextResponse.json({ received: true });
}
