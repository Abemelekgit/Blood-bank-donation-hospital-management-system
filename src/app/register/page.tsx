"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Registration failed");
    } else {
      // Auto sign in and redirect to profile
      const login = await signIn("credentials", { email: form.email, password: form.password, redirect: false });
      if (login?.ok) {
        // Although new users are CLIENT by default, support staff onboarding
        const sessionRes = await fetch("/api/auth/session");
        const session = await sessionRes.json().catch(() => ({}));
        const role = session?.user?.role as string | undefined;
        const isStaff = role === "ADMIN" || role === "NURSE" || role === "DOCTOR";
        router.push(isStaff ? "/admin/panel" : "/profile");
      } else {
        setSuccess("Registration successful. Please sign in.");
        setTimeout(() => router.push("/login?callbackUrl=/profile"), 800);
      }
    }
  }

  return (
    <div className="relative mx-auto max-w-md py-10">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-40" style={{backgroundImage: 'url(/bg/dots.svg)', backgroundSize: 'auto', backgroundRepeat: 'repeat'}} />
      <div className="bg-white p-6 rounded-lg shadow border">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Become a donor</h1>
        <p className="text-slate-600 text-sm mt-1">Join our hospital’s community of lifesavers. Registration takes less than 2 minutes.</p>
        <form onSubmit={onSubmit} className="space-y-4 mt-5">
          {(["name", "email", "phone", "password"] as const).map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium mb-1 capitalize">{key}</label>
              <input
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-200"
                type={key === "password" ? "password" : key === "email" ? "email" : "text"}
                value={form[key]}
                onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                required
              />
            </div>
          ))}
          {error && <p className="text-red-600 text-sm">{error}</p>}
          {success && <p className="text-green-700 text-sm">{success}</p>}
          <button disabled={loading} className="w-full bg-red-600 text-white py-2 rounded font-medium shadow hover:bg-red-700 disabled:opacity-60">{loading ? "Submitting..." : "Create account"}</button>
        </form>
      </div>
    </div>
  );
}
