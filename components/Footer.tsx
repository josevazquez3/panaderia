import { Container } from "@/components/Container";
import { FacebookIcon } from "@/components/icons/FacebookIcon";
import { InstagramIcon } from "@/components/icons/InstagramIcon";
import type { SiteSettings } from "@/types";

type FooterProps = {
  settings: SiteSettings;
};

const socialLinkClass =
  "inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition duration-200 hover:bg-brand-yellow hover:text-brand-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-yellow";

export function Footer({ settings }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-ink text-white">
      <Container className="flex flex-col gap-8 py-12 sm:py-14 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-md">
          <p className="font-display text-2xl font-medium tracking-tight">
            {settings.bakeryName}
          </p>
          <a
            href={`mailto:${settings.email}`}
            className="mt-3 inline-block text-gray-200 transition duration-200 hover:text-brand-yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-yellow"
          >
            {settings.email}
          </a>
        </div>
        <div className="flex items-center gap-2">
          {settings.instagramUrl ? (
            <a
              href={settings.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram de ${settings.bakeryName}`}
              className={socialLinkClass}
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
          ) : null}
          {settings.facebookUrl ? (
            <a
              href={settings.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Facebook de ${settings.bakeryName}`}
              className={socialLinkClass}
            >
              <FacebookIcon className="h-5 w-5" />
            </a>
          ) : null}
        </div>
      </Container>
      <div className="border-t border-white/15">
        <Container className="py-4">
          <p className="text-sm text-gray-200">
            © {year} {settings.bakeryName}. Todos los derechos reservados.
          </p>
        </Container>
      </div>
    </footer>
  );
}
