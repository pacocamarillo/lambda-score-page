"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { site } from "@/content/site";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[color:var(--bg-deep)]/90 text-white backdrop-blur-md">
      <div className="container flex items-center justify-between gap-4 py-3">
        <Link href="/" className="relative block h-10 w-[150px] shrink-0">
          <Image
            src="/images/logo-lambda.png"
            alt="LambdaScore"
            fill
            className="object-contain object-left"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Principal">
          <Link
            href={site.companyLink.href}
            className={`text-sm ${isActive(pathname, site.companyLink.href) ? "text-[color:var(--brand)]" : "text-white/80 hover:text-white"}`}
          >
            {site.companyLink.label}
          </Link>
          {site.navGroups.map((group) => (
            <div key={group.label} className="relative group">
              <span className="text-xs uppercase tracking-[0.18em] text-white/45">
                {group.label}
              </span>
              <div className="mt-1 flex gap-3">
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-sm ${isActive(pathname, item.href) ? "text-[color:var(--brand)]" : "text-white/80 hover:text-white"}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <Link href={site.cta.href} className="btn btn-primary !py-2 !px-4 text-sm">
            {site.cta.label}
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-full border border-white/25 px-3 py-2 text-sm lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Cerrar" : "Menú"}
        </button>
      </div>

      {open ? (
        <div
          id="mobile-nav"
          className="border-t border-white/10 bg-[color:var(--bg-deep)] lg:hidden"
        >
          <div className="container flex flex-col gap-4 py-4">
            <Link
              href={site.companyLink.href}
              onClick={() => setOpen(false)}
              className={isActive(pathname, site.companyLink.href) ? "text-[color:var(--brand)]" : ""}
            >
              {site.companyLink.label}
            </Link>
            {site.navGroups.map((group) => (
              <div key={group.label}>
                <p className="mb-2 text-xs uppercase tracking-[0.18em] text-white/45">
                  {group.label}
                </p>
                <div className="flex flex-col gap-2">
                  {group.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={isActive(pathname, item.href) ? "text-[color:var(--brand)]" : ""}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
            <Link
              href={site.cta.href}
              className="btn btn-primary"
              onClick={() => setOpen(false)}
            >
              {site.cta.label}
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
