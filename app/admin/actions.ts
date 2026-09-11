"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { ADMIN_COOKIE_NAME, createSessionToken, verifyPassword } from "@/lib/admin-auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { sendShippedEmail } from "@/lib/email";

export type LoginState = { error: string | null };

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const password = formData.get("password");

  if (typeof password !== "string" || password.length === 0) {
    return { error: "Enter the admin password." };
  }

  if (!verifyPassword(password)) {
    return { error: "Incorrect password." };
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8,
  });

  revalidatePath("/admin");
  return { error: null };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  revalidatePath("/admin");
}

export async function deleteSubscriber(id: string) {
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("waitlist").delete().eq("id", id);

  if (error) {
    throw new Error("Failed to delete subscriber.");
  }

  revalidatePath("/admin");
}

export type MarkShippedState = { error: string | null };

export async function markOrderShipped(
  orderId: string,
  _prevState: MarkShippedState,
  formData: FormData
): Promise<MarkShippedState> {
  const trackingNumber = formData.get("trackingNumber");
  const trackingUrlRaw = formData.get("trackingUrl");

  if (typeof trackingNumber !== "string" || trackingNumber.trim().length === 0) {
    return { error: "Enter a tracking number." };
  }

  const trackingUrl =
    typeof trackingUrlRaw === "string" && trackingUrlRaw.trim().length > 0 ? trackingUrlRaw.trim() : null;

  const supabase = createSupabaseAdminClient();
  const { data: order, error } = await supabase
    .from("orders")
    .update({
      status: "shipped",
      tracking_number: trackingNumber.trim(),
      tracking_url: trackingUrl,
      shipped_at: new Date().toISOString(),
    })
    .eq("id", orderId)
    .select("email, size")
    .single();

  if (error || !order) {
    return { error: "Failed to update order." };
  }

  await sendShippedEmail(order.email, {
    size: order.size,
    orderId,
    trackingNumber: trackingNumber.trim(),
    trackingUrl,
  });

  revalidatePath("/admin");
  return { error: null };
}

/**
 * Marks an order as refunded in our own records after you've issued the
 * actual refund in the Stripe dashboard — Stripe is always the source of
 * truth for whether money moved, this just keeps /admin in sync with it.
 */
export async function markOrderRefunded(orderId: string) {
  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("orders").update({ status: "refunded" }).eq("id", orderId);

  if (error) {
    throw new Error("Failed to update order.");
  }

  revalidatePath("/admin");
}
