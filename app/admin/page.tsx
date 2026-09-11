import type { Metadata } from "next";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, verifySessionToken } from "@/lib/admin-auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import LoginForm from "@/app/admin/login-form";
import ShipOrderForm from "@/app/admin/ship-order-form";
import { deleteSubscriber, logout } from "@/app/admin/actions";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default async function AdminPage() {
  const cookieStore = await cookies();
  const isAuthed = verifySessionToken(cookieStore.get(ADMIN_COOKIE_NAME)?.value);

  if (!isAuthed) {
    return <LoginForm />;
  }

  const supabase = createSupabaseAdminClient();
  const { data: subscribers, error } = await supabase
    .from("waitlist")
    .select("id, email, created_at")
    .order("created_at", { ascending: false });

  const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select("id, email, size, amount_total, currency, status, tracking_number, tracking_url, created_at")
    .order("created_at", { ascending: false });

  function formatMoney(cents: number, currency: string) {
    return new Intl.NumberFormat("en-IE", { style: "currency", currency: currency.toUpperCase() }).format(
      cents / 100
    );
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-16 sm:px-10">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl tracking-[0.1em] text-ghost sm:text-4xl">
            WAITLIST
          </h1>
          <p className="mt-1 text-sm text-ghost-dim">
            {subscribers?.length ?? 0} subscriber{subscribers?.length === 1 ? "" : "s"}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/api/admin/export"
            className="border border-white/15 px-4 py-2 text-xs tracking-[0.15em] text-ghost uppercase transition-colors duration-300 hover:border-cyan hover:text-cyan"
          >
            Export CSV
          </a>
          <form action={logout}>
            <button
              type="submit"
              className="border border-white/15 px-4 py-2 text-xs tracking-[0.15em] text-ghost-dim uppercase transition-colors duration-300 hover:border-violet hover:text-violet"
            >
              Log out
            </button>
          </form>
        </div>
      </div>

      {error && (
        <p className="text-sm text-violet">Failed to load subscribers: {error.message}</p>
      )}

      {subscribers && subscribers.length === 0 && (
        <p className="text-sm text-ghost-dim">No one has joined the waitlist yet.</p>
      )}

      {subscribers && subscribers.length > 0 && (
        <div className="overflow-x-auto border border-white/10">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs tracking-[0.15em] text-ghost-dim uppercase">
                <th className="px-4 py-3 font-normal">Email</th>
                <th className="px-4 py-3 font-normal">Joined</th>
                <th className="px-4 py-3 font-normal text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((sub) => (
                <tr key={sub.id} className="border-b border-white/5 last:border-0">
                  <td className="px-4 py-3 text-ghost">{sub.email}</td>
                  <td className="px-4 py-3 text-ghost-dim">{formatDate(sub.created_at)}</td>
                  <td className="px-4 py-3 text-right">
                    <form action={deleteSubscriber.bind(null, sub.id)}>
                      <button
                        type="submit"
                        className="text-xs tracking-[0.1em] text-ghost-dim uppercase transition-colors duration-300 hover:text-violet"
                      >
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-16 mb-8">
        <h2 className="font-display text-2xl tracking-[0.1em] text-ghost sm:text-3xl">ORDERS</h2>
        <p className="mt-1 text-sm text-ghost-dim">
          {orders?.length ?? 0} order{orders?.length === 1 ? "" : "s"}
        </p>
      </div>

      {ordersError && (
        <p className="text-sm text-violet">
          Orders table not found yet — run <code>supabase/orders.sql</code> in the Supabase SQL
          editor to enable this section.
        </p>
      )}

      {orders && orders.length === 0 && (
        <p className="text-sm text-ghost-dim">No orders yet.</p>
      )}

      {orders && orders.length > 0 && (
        <div className="overflow-x-auto border border-white/10">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-white/10 text-xs tracking-[0.15em] text-ghost-dim uppercase">
                <th className="px-4 py-3 font-normal">Email</th>
                <th className="px-4 py-3 font-normal">Size</th>
                <th className="px-4 py-3 font-normal">Total</th>
                <th className="px-4 py-3 font-normal">Status</th>
                <th className="px-4 py-3 font-normal">Placed</th>
                <th className="px-4 py-3 font-normal text-right">Tracking</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-white/5 last:border-0">
                  <td className="px-4 py-3 text-ghost">{order.email}</td>
                  <td className="px-4 py-3 text-ghost-dim">{order.size}</td>
                  <td className="px-4 py-3 text-ghost-dim">{formatMoney(order.amount_total, order.currency)}</td>
                  <td className="px-4 py-3 text-ghost-dim uppercase">{order.status}</td>
                  <td className="px-4 py-3 text-ghost-dim">{formatDate(order.created_at)}</td>
                  <td className="px-4 py-3 text-right">
                    {order.tracking_number ? (
                      order.tracking_url ? (
                        <a
                          href={order.tracking_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-cyan underline decoration-cyan/40 underline-offset-2"
                        >
                          {order.tracking_number}
                        </a>
                      ) : (
                        <span className="text-xs text-ghost-dim">{order.tracking_number}</span>
                      )
                    ) : (
                      <ShipOrderForm orderId={order.id} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
