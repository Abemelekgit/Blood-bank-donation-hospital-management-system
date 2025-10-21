"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const isStaff = ["NURSE", "DOCTOR", "ADMIN"].includes(session?.user?.role ?? "");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const isDark = stored === "dark";
    setDark(isDark);
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, []);

  function toggleTheme() {
    const next = !dark;
    setDark(next);
    localStorage.setItem("theme", next ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", next ? "dark" : "light");
  }

  return (
    <nav className="w-full sticky top-0 z-20 border-b bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-red-600 text-white text-xs font-bold">🩸</span>
            <span className="text-base font-semibold tracking-tight">Lifeline Blood Bank</span>
          </Link>
          <div className="hidden md:flex items-center gap-5 text-sm text-slate-700">
            <Link href="/register" className={`${pathname === "/register" ? "text-red-700" : "hover:text-slate-900"}`}>Register</Link>
            {isStaff && (
              <Link href="/admin/panel" className={`${pathname.startsWith("/admin") ? "text-red-700" : "hover:text-slate-900"}`}>Admin</Link>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/register" className="hidden sm:inline-flex rounded-md bg-red-600 px-3 py-1.5 text-sm font-medium text-white shadow hover:bg-red-700">Donate now</Link>
          <button aria-label="Toggle dark mode" onClick={toggleTheme} className="rounded-md border px-2 py-1 text-sm hover:bg-white/60">
            {dark ? "Dark" : "Light"}
          </button>
          {!session?.user ? (
            <Link href="/login" className="text-sm text-slate-700 underline underline-offset-4">Staff login</Link>
          ) : (
            <>
              <span className="hidden sm:inline text-sm text-slate-600">{session.user.name} <span className="text-slate-400">·</span> {session.user.role}</span>
              <button onClick={() => signOut()} className="text-sm text-slate-700 underline underline-offset-4">Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
