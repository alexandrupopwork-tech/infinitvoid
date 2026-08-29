import { NextResponse, after } from "next/server";
import { createSupabaseAnonServerClient } from "@/lib/supabase/anon-server";
import { isValidEmail, normalizeEmail } from "@/lib/validate-email";
import { sendWelcomeEmail } from "@/lib/email";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const rawEmail = (body as { email?: unknown } | null)?.email;

  if (typeof rawEmail !== "string" || !isValidEmail(rawEmail)) {
    return NextResponse.json(
      { error: "Enter a valid email address." },
      { status: 400 }
    );
  }

  const email = normalizeEmail(rawEmail);
  const supabase = createSupabaseAnonServerClient();

  const { error } = await supabase.from("waitlist").insert({ email });

  if (error) {
    // Postgres unique_violation
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "That email is already on the list." },
        { status: 409 }
      );
    }

    console.error("waitlist insert failed", error);
    return NextResponse.json(
      { error: "Something went wrong. Try again in a moment." },
      { status: 500 }
    );
  }

  after(() => sendWelcomeEmail(email));

  return NextResponse.json({ message: "You're officially on the list." }, { status: 201 });
}
