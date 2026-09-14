import "server-only";
import crypto from "node:crypto";

const GRAPH_API_VERSION = "v21.0";
const GRAPH_API_BASE = `https://graph.facebook.com/${GRAPH_API_VERSION}`;

/**
 * Verifies the X-Hub-Signature-256 header Meta signs every webhook delivery
 * with, using the app secret. Must run on the raw request body — a
 * reparsed/re-stringified body will not match the signature Meta computed.
 */
export function verifyWebhookSignature(rawBody: string, signatureHeader: string | null): boolean {
  const appSecret = process.env.INSTAGRAM_APP_SECRET;
  if (!appSecret || !signatureHeader) return false;

  const expected = crypto.createHmac("sha256", appSecret).update(rawBody).digest("hex");
  const provided = signatureHeader.replace(/^sha256=/, "");

  if (expected.length !== provided.length) return false;
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(provided));
}

/**
 * Sends a DM reply via the Instagram Messaging API (Send API). Never
 * throws — a failed auto-reply must not take down webhook processing;
 * errors are logged for later investigation instead.
 */
export async function sendDirectMessageReply(recipientId: string, text: string): Promise<void> {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!accessToken) {
    console.warn("INSTAGRAM_ACCESS_TOKEN not set — skipping DM reply to", recipientId);
    return;
  }

  try {
    const res = await fetch(`${GRAPH_API_BASE}/me/messages?access_token=${accessToken}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipient: { id: recipientId },
        message: { text },
      }),
    });

    if (!res.ok) {
      console.error("instagram DM reply failed", res.status, await res.text());
    }
  } catch (err) {
    console.error("instagram DM reply threw", err);
  }
}

/**
 * Replies to a comment on a post via the Instagram Graph API. Never
 * throws, same rationale as sendDirectMessageReply.
 */
export async function sendCommentReply(commentId: string, text: string): Promise<void> {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!accessToken) {
    console.warn("INSTAGRAM_ACCESS_TOKEN not set — skipping comment reply to", commentId);
    return;
  }

  try {
    const res = await fetch(`${GRAPH_API_BASE}/${commentId}/replies?access_token=${accessToken}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    if (!res.ok) {
      console.error("instagram comment reply failed", res.status, await res.text());
    }
  } catch (err) {
    console.error("instagram comment reply threw", err);
  }
}
