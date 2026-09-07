import { NextResponse } from "next/server";
import { createSupabaseAnonServerClient } from "@/lib/supabase/anon-server";

/**
 * Vercel Cron hits this on a schedule (see vercel.json) purely to generate
 * real API traffic against Supabase — the free tier auto-pauses a project
 * after 7 days with no activity, and a lightweight read resets that clock.
 */
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const authHeader = request.headers.get("authorization");

  if (secret && authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createSupabaseAnonServerClient();
  const { error } = await supabase.from("waitlist").select("id").limit(1);

  if (error) {
    console.error("keep-alive ping failed", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true, pinged: new Date().toISOString() });
}
