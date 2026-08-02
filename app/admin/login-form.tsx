"use client";

import { useActionState } from "react";
import { login, type LoginState } from "@/app/admin/actions";

const initialState: LoginState = { error: null };

export default function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <form action={formAction} className="flex w-full max-w-sm flex-col gap-4">
        <h1 className="font-display text-2xl tracking-[0.15em] text-ghost">ADMIN ACCESS</h1>

        <label htmlFor="password" className="sr-only">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          placeholder="Password"
          className="w-full border border-white/15 bg-white/5 px-4 py-3 text-sm text-ghost placeholder:text-ghost-dim outline-none transition-colors duration-300 focus:border-cyan/70"
        />

        {state.error && (
          <p className="text-sm text-violet" role="alert">
            {state.error}
          </p>
        )}

        <button
          type="submit"
          disabled={isPending}
          className="border border-ghost/30 bg-ghost px-6 py-3 font-display text-sm tracking-[0.15em] text-void transition-colors duration-300 hover:border-cyan disabled:opacity-60"
        >
          {isPending ? "CHECKING…" : "ENTER"}
        </button>
      </form>
    </div>
  );
}
