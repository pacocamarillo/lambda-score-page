import Link from "next/link";
import { site } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="mt-auto bg-[color:var(--bg-deep)] text-white">
      <div className="container grid gap-10 py-14 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <p className="display text-3xl text-[color:var(--brand)]">{site.name}</p>
          <p className="mt-3 max-w-sm text-white/70">
            Socio All-in-One de producción de carreras en el centro de México.
          </p>
        </div>

        <div>
          <h2 className="text-sm uppercase tracking-[0.18em] text-white/45">
            Medios de contacto
          </h2>
          <ul className="mt-4 space-y-2 text-white/85">
            <li>
              Llamadas:{" "}
              <a href={`tel:${site.phone}`} className="underline-offset-2 hover:underline">
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              Mkt:{" "}
              <a
                href={`tel:${site.marketingPhone}`}
                className="underline-offset-2 hover:underline"
              >
                {site.marketingPhoneDisplay}
              </a>
            </li>
            <li>
              Email:{" "}
              <a
                href={`mailto:${site.email}`}
                className="underline-offset-2 hover:underline"
              >
                {site.email}
              </a>
            </li>
            <li>
              <a
                href={site.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline-offset-2 hover:underline"
              >
                Escríbenos por WhatsApp
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm uppercase tracking-[0.18em] text-white/45">
            Menú
          </h2>
          <ul className="mt-4 space-y-2 text-white/85">
            <li>
              <Link href="/">{site.name}</Link>
            </li>
            <li>
              <Link href={site.companyLink.href}>{site.companyLink.label}</Link>
            </li>
            {site.navGroups.flatMap((group) =>
              group.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              )),
            )}
          </ul>
          <div className="mt-6 flex gap-4">
            {site.social.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[color:var(--brand)] hover:underline"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-sm text-white/45">
        © {new Date().getFullYear()} {site.legalName}
      </div>
    </footer>
  );
}
