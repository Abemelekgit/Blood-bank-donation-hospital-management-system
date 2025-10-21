"use client";
import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";

export default function LoginPage() {
  const params = useSearchParams();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callbackUrl = params.get("callbackUrl") ?? "/";
  const hasCallback = params.has("callbackUrl");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await signIn("credentials", { email, password, redirect: false, callbackUrl });
    setLoading(false);
    if (res?.error) {
      setError("Invalid email or password");
    } else if (res?.ok) {
      // Fetch the updated session directly from the API to avoid stale cache
      const sessionRes = await fetch("/api/auth/session");
      const session = await sessionRes.json().catch(() => ({}));
      const role = (session?.user as any)?.role as string | undefined;
      const isStaff = role === "ADMIN" || role === "NURSE" || role === "DOCTOR";
  if ((!hasCallback || callbackUrl === "/") && isStaff) router.push("/admin/panel");
      else router.push(res.url ?? callbackUrl);
    }
  }

  return (
    <div className="relative mx-auto max-w-md py-10">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40" style={{backgroundImage: 'url(/bg/dots.svg)', backgroundSize: 'auto', backgroundRepeat: 'repeat'}} />
      <div className="bg-white p-6 rounded-lg shadow border">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Staff sign in</h1>
        <p className="text-slate-600 text-sm mt-1">Access the donor search and clinical tools.</p>
        <form onSubmit={onSubmit} className="space-y-4 mt-5">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-200" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-200" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button disabled={loading} className="w-full bg-red-600 text-white py-2 rounded font-medium shadow hover:bg-red-700 disabled:opacity-60">{loading ? "Signing in..." : "Sign in"}</button>
        </form>
      </div>
    </div>
  );
}
