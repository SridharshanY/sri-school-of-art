"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

const links = [
  { href: "/", label: "Home" },
  { href: "/about/", label: "About" },
  { href: "/classes/", label: "Classes" },
  { href: "/gallery/", label: "Gallery" },
  { href: "/workshops/", label: "Workshops" },
  { href: "/contact/", label: "Contact" }
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <div className="announcement">
        <span className="announcement-dot" aria-hidden="true" />
        New weekend batches are open
        <Link href="/registration/">Book a trial class</Link>
      </div>
      <header className="site-header">
        <div className="container nav-wrap">
          <Link href="/" className="brand" aria-label="Sri School of Art home">
            <span className="brand-mark" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span className="brand-copy">
              <strong>Sri</strong>
              <span>School of Art</span>
            </span>
          </Link>

          <nav className="desktop-nav" aria-label="Primary navigation">
            {links.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  className={active ? "nav-link active" : "nav-link"}
                  href={link.href}
                  key={link.href}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="nav-actions">
            <Link className="btn btn-small btn-dark desktop-trial" href="/registration/">
              Book a trial <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
            <button
              className="menu-button"
              type="button"
              aria-label={open ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <div className={open ? "mobile-panel open" : "mobile-panel"}>
          <nav className="mobile-nav container" aria-label="Mobile navigation">
            {links.map((link, index) => (
              <Link href={link.href} key={link.href}>
                <span>0{index + 1}</span>
                {link.label}
                <ArrowUpRight size={20} aria-hidden="true" />
              </Link>
            ))}
            <Link className="btn btn-primary mobile-trial" href="/registration/">
              Book a trial class
            </Link>
            <p>English · தமிழ் version planned</p>
          </nav>
        </div>
      </header>
    </>
  );
}
