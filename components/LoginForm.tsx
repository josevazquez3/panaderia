"use client";

import { FormEvent } from "react";

const fieldClass =
  "mt-2 w-full rounded-2xl border border-brand-ink/10 bg-white px-4 py-3 text-base text-brand-ink shadow-sm transition duration-200 focus:border-brand-yellow focus:outline-none focus:ring-2 focus:ring-brand-yellow/40";

export function LoginForm() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-brand-ink">
          Correo electrónico
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          autoCapitalize="none"
          required
          className={fieldClass}
        />
      </div>
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-brand-ink"
        >
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className={fieldClass}
        />
      </div>
      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-full bg-brand-yellow px-5 py-3 text-sm font-semibold text-brand-ink shadow-soft transition duration-200 hover:bg-brand-yellowDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellowDark"
      >
        Ingresar
      </button>
    </form>
  );
}
