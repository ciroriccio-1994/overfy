"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface Props {
  isAuthenticated: boolean;
  isAdmin: boolean;
  userEmail: string | null;
  userName: string | null;
}

export function NavbarClient({ isAuthenticated, isAdmin, userEmail, userName }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    function onDown(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [menuOpen]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setMenuOpen(false);
    router.push("/");
    router.refresh();
  }

  const initials = computeInitials(userName, userEmail);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[var(--color-bg)]/92 backdrop-blur-md border-b border-[var(--color-line)] py-3"
          : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center group" aria-label="Overfy">
          <Image
            src="/logo-overfy-brand.png"
            alt="Overfy"
            width={200}
            height={62}
            priority
            className="h-9 w-auto md:h-10"
          />
        </Link>

        <div className="hidden lg:flex items-center gap-6 text-sm">
          <Link
            href="/#demo"
            className="text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition"
          >
            Esempi
          </Link>
          <Link
            href="/#come-funziona"
            className="text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition"
          >
            Come funziona
          </Link>
          <Link
            href="/#pacchetti"
            className="text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition font-medium"
          >
            Pacchetti
          </Link>
          <Link
            href="/per-aziende"
            className="text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition"
          >
            Per aziende
          </Link>

          {isAuthenticated ? (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--color-line)] hover:border-[var(--color-ink)] transition"
                aria-haspopup="menu"
                aria-expanded={menuOpen}
              >
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium"
                  style={{
                    background: "var(--color-ink)",
                    color: "var(--color-paper)",
                  }}
                >
                  {initials}
                </span>
                <span className="text-xs text-[var(--color-ink-soft)] max-w-[140px] truncate">
                  {userName || userEmail}
                </span>
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" aria-hidden>
                  <path
                    d="M3 4.5L6 7.5L9 4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {menuOpen && (
                <div
                  role="menu"
                  className="absolute right-0 top-[calc(100%+8px)] min-w-[220px] bg-[var(--color-paper)] border border-[var(--color-line)] rounded-2xl shadow-lg overflow-hidden"
                >
                  <div className="px-4 py-3 border-b border-[var(--color-line)]">
                    <div className="text-xs text-[var(--color-muted)]">Account</div>
                    <div className="text-sm text-[var(--color-ink)] truncate">
                      {userEmail}
                    </div>
                  </div>
                  <Link
                    href={isAdmin ? "/admin" : "/dashboard"}
                    className="flex items-center gap-2 px-4 py-3 text-sm text-[var(--color-ink)] hover:bg-[var(--color-bg-soft)] transition"
                  >
                    {isAdmin && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-mint)]"></span>
                    )}
                    {isAdmin ? "Dashboard admin" : "Dashboard"}
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-sm text-[var(--color-ink-soft)] hover:bg-[var(--color-bg-soft)] transition border-t border-[var(--color-line)]"
                  >
                    Esci
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                href="/login"
                className="text-[var(--color-ink-soft)] hover:text-[var(--color-ink)] transition"
              >
                Accedi
              </Link>
              <Link
                href="/contatti"
                className="bg-[var(--color-ink)] text-[var(--color-paper)] px-5 py-2.5 rounded-full text-xs font-medium hover:bg-[var(--color-mint-ink)] transition shadow-sm"
              >
                Prenota una call →
              </Link>
            </>
          )}
        </div>

        {isAuthenticated ? (
          <Link
            href={isAdmin ? "/admin" : "/dashboard"}
            className="lg:hidden bg-[var(--color-ink)] text-[var(--color-paper)] px-4 py-2 rounded-full text-xs"
          >
            {isAdmin ? "Admin" : "Dashboard"}
          </Link>
        ) : (
          <Link
            href="/contatti"
            className="lg:hidden bg-[var(--color-ink)] text-[var(--color-paper)] px-4 py-2 rounded-full text-xs"
          >
            Contatti
          </Link>
        )}
      </div>
    </nav>
  );
}

function computeInitials(name: string | null, email: string | null): string {
  if (name && name.trim().length > 0) {
    const parts = name.trim().split(/\s+/);
    return ((parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "")).toUpperCase() || "U";
  }
  if (email && email.length > 0) {
    return email[0]?.toUpperCase() ?? "U";
  }
  return "U";
}
