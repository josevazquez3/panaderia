import Image from "next/image";
import Link from "next/link";
import type { SiteSettings } from "@/types";

type HeaderProps = {
  settings: SiteSettings;
};

export function Header({ settings }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-brand-ink/10 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label={`${settings.bakeryName}, ir al inicio`}
          className="flex min-w-0 items-center gap-3 rounded-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-yellow"
        >
          {settings.logoUrl ? (
            <Image
              src={settings.logoUrl}
              alt=""
              width={44}
              height={44}
              className="h-10 w-10 shrink-0 rounded-full object-cover sm:h-11 sm:w-11"
            />
          ) : null}
          <span className="truncate font-display text-lg font-medium tracking-tight text-brand-ink sm:text-2xl">
            {settings.bakeryName}
          </span>
        </Link>
        <Link
          href="/login"
          aria-label="Ingresar"
          className="inline-flex shrink-0 items-center justify-center rounded-full bg-brand-yellow px-4 py-2.5 text-sm font-semibold text-brand-ink shadow-soft transition duration-200 hover:bg-brand-yellowDark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellowDark sm:px-5"
        >
          Ingresar
        </Link>
      </div>
    </header>
  );
}
