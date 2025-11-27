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
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-900 to-blue-900">
        {/* Animated medical blobs */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-red-500/30 to-crimson-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/10 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Glassmorphic card container */}
        <div className="backdrop-blur-2xl bg-white/10 dark:bg-slate-800/40 rounded-3xl p-10 border border-white/30 dark:border-white/10 shadow-2xl">
          {/* Header section */}
          <div className="text-center mb-10">
            <div className="inline-block mb-6 p-4 rounded-full bg-red-500/20 border border-red-500/40">
              <svg className="w-8 h-8 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </div>
            <h1 className="text-4xl font-black text-white mb-3 tracking-tight">
              <span className="bg-gradient-to-r from-white via-red-200 to-white bg-clip-text text-transparent">
                Staff Portal
              </span>
            </h1>
            <p className="text-blue-100 font-medium">
              Authorized medical professionals only
            </p>
          </div>

          {/* Form */}
          <form onSubmit={onSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-bold mb-3 text-slate-900 dark:text-white">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="staff@bloodline.et"
                className="w-full px-4 py-3 rounded-xl bg-white/20 dark:bg-slate-700/50 border border-white/40 dark:border-white/20 text-black dark:text-white placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-bold mb-3 text-slate-900 dark:text-white">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-white/20 dark:bg-slate-700/50 border border-white/40 dark:border-white/20 text-black dark:text-white placeholder-slate-400 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/50 backdrop-blur-sm">
                <p className="text-red-200 text-sm font-medium flex items-center gap-2">
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  {error}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-red-600/50 disabled:to-red-700/50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl shadow-lg group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-50 transition-opacity"></div>
              <span className="relative flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Signing in...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Sign In
                  </>
                )}
              </span>
            </button>
          </form>

          {/* Divider */}
          <div className="mt-8 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gradient-to-r from-blue-900 to-blue-900 text-white/60 font-medium">
                Healthcare Professional?
              </span>
            </div>
          </div>

          {/* Info Message */}
          <div className="mt-8 p-4 rounded-xl bg-blue-500/10 border border-blue-500/30 backdrop-blur-sm">
            <p className="text-blue-100 text-sm leading-relaxed">
              <span className="font-bold block mb-2">Demo Credentials:</span>
              Email: <code className="bg-white/10 px-2 py-1 rounded text-blue-50 font-mono">staff@bloodline.et</code>
              <br />
              Password: <code className="bg-white/10 px-2 py-1 rounded text-blue-50 font-mono">instructor123</code>
            </p>
          </div>
        </div>

        {/* Footer text */}
        <p className="text-center mt-8 text-blue-100 text-sm font-medium">
          Need to register as a donor?{" "}
          <a href="/register" className="text-red-300 hover:text-red-200 font-bold underline transition-colors">
            Visit registration
          </a>
        </p>
      </div>
    </div>
  );
}
