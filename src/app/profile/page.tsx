"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, CardBody } from "@/components/Card";

type BloodType = "A_POS"|"A_NEG"|"B_POS"|"B_NEG"|"AB_POS"|"AB_NEG"|"O_POS"|"O_NEG";

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [data, setData] = useState<any>({
    name: "",
    bloodType: "" as any,
    dateOfBirth: "",
    gender: "",
    weightKg: "",
    address: "",
    city: "",
    emergencyContactName: "",
    emergencyContactPhone: "",
    medicalNotes: "",
    consent: false,
  });

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/profile");
      if (res.status === 401) {
        router.push("/login?callbackUrl=/profile");
        return;
      }
      const json = await res.json();
      const u = json.user;
      setData((d: any) => ({
        ...d,
        name: u?.name ?? "",
        bloodType: u?.profile?.bloodType ?? "",
        dateOfBirth: u?.profile?.dateOfBirth ? new Date(u.profile.dateOfBirth).toISOString().slice(0, 10) : "",
        gender: u?.profile?.gender ?? "",
        weightKg: u?.profile?.weightKg ?? "",
        address: u?.profile?.address ?? "",
        city: u?.profile?.city ?? "",
        emergencyContactName: u?.profile?.emergencyContactName ?? "",
        emergencyContactPhone: u?.profile?.emergencyContactPhone ?? "",
        medicalNotes: u?.profile?.medicalNotes ?? "",
        consent: u?.profile?.consent ?? false,
      }));
      setLoading(false);
    })();
  }, [router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(null);
    const payload = {
      ...data,
      weightKg: data.weightKg ? Number(data.weightKg) : undefined,
      dateOfBirth: data.dateOfBirth || undefined,
      bloodType: data.bloodType || undefined,
    };
    const res = await fetch("/api/profile", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    setSaving(false);
    if (!res.ok) {
      const j = await res.json().catch(() => ({}));
      setError(j.error || "Failed to save profile");
    } else {
      // On success, go back to home page automatically
      router.push("/");
    }
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white via-blue-50 to-white dark:from-slate-900 dark:via-blue-950/20 dark:to-slate-900">
      {/* Animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-red-500/20 to-red-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-400/15 to-blue-400/5 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative mx-auto max-w-4xl px-4 py-12 md:py-20">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-block px-5 py-2 rounded-full bg-red-500/15 text-red-600 dark:text-red-400 text-sm font-bold mb-6 border border-red-500/30">
            🩸 Complete Your Profile
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-4 leading-tight">
            Complete Your <span className="text-red-600 dark:text-red-500">Donor Profile</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 font-medium">
            Provide your details so our clinical team can screen and schedule your donation.
          </p>
        </div>

        {/* Form Card */}
        <div className="backdrop-blur-2xl bg-white/80 dark:bg-slate-800/40 rounded-3xl p-10 md:p-14 border border-white/40 dark:border-white/10 shadow-2xl">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="relative w-16 h-16 mb-4">
                <svg className="w-full h-full text-red-600 dark:text-red-400 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <p className="text-slate-600 dark:text-slate-300 font-medium">Loading your profile...</p>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-8">
              {/* Personal Information Section */}
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                  <span className="text-2xl">👤</span> Personal Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">Full Name</label>
                    <input
                      className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                      value={data.name}
                      onChange={(e) => setData({ ...data, name: e.target.value })}
                      required
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">Blood Type</label>
                    <select
                      className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                      value={data.bloodType}
                      onChange={(e) => setData({ ...data, bloodType: e.target.value as BloodType })}
                    >
                      <option value="">Select your blood type</option>
                      {(["A_POS","A_NEG","B_POS","B_NEG","AB_POS","AB_NEG","O_POS","O_NEG"] as const).map((bt) => (
                        <option key={bt} value={bt}>{bt.replace("_","").replace("POS","+").replace("NEG","-")}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">Date of Birth</label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                      value={data.dateOfBirth}
                      onChange={(e) => setData({ ...data, dateOfBirth: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">Gender</label>
                    <select
                      className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                      value={data.gender}
                      onChange={(e) => setData({ ...data, gender: e.target.value })}
                    >
                      <option value="">Select gender</option>
                      <option>Female</option>
                      <option>Male</option>
                      <option>Other</option>
                      <option>Prefer not to say</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">Weight (kg)</label>
                    <input
                      type="number"
                      min={30}
                      className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                      value={data.weightKg}
                      onChange={(e) => setData({ ...data, weightKg: e.target.value })}
                      placeholder="50"
                    />
                  </div>
                </div>
              </div>

              {/* Address Section */}
              <div className="pt-8 border-t border-slate-200 dark:border-slate-700">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                  <span className="text-2xl">📍</span> Address Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">Street Address</label>
                    <input
                      className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                      value={data.address}
                      onChange={(e) => setData({ ...data, address: e.target.value })}
                      placeholder="123 Main Street"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">City</label>
                    <input
                      className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                      value={data.city}
                      onChange={(e) => setData({ ...data, city: e.target.value })}
                      placeholder="Addis Ababa"
                    />
                  </div>
                </div>
              </div>

              {/* Emergency Contact Section */}
              <div className="pt-8 border-t border-slate-200 dark:border-slate-700">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                  <span className="text-2xl">🆘</span> Emergency Contact
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">Contact Name</label>
                    <input
                      className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                      value={data.emergencyContactName}
                      onChange={(e) => setData({ ...data, emergencyContactName: e.target.value })}
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">Contact Phone</label>
                    <input
                      className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                      value={data.emergencyContactPhone}
                      onChange={(e) => setData({ ...data, emergencyContactPhone: e.target.value })}
                      placeholder="+251-911-234567"
                    />
                  </div>
                </div>
              </div>

              {/* Medical Section */}
              <div className="pt-8 border-t border-slate-200 dark:border-slate-700">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                  <span className="text-2xl">⚕️</span> Medical Information
                </h2>
                <div>
                  <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">Medical Notes (Optional)</label>
                  <textarea
                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                    rows={4}
                    value={data.medicalNotes}
                    onChange={(e) => setData({ ...data, medicalNotes: e.target.value })}
                    placeholder="Any medical conditions, medications, or allergies we should know about..."
                  />
                </div>
              </div>

              {/* Consent Section */}
              <div className="pt-8 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-start gap-4 p-6 rounded-xl bg-red-50/50 dark:bg-red-950/20 border border-red-200/50 dark:border-red-900/50">
                  <input
                    id="consent"
                    type="checkbox"
                    className="h-5 w-5 rounded border-slate-300 text-red-600 focus:ring-red-500 mt-1 flex-shrink-0 cursor-pointer"
                    checked={data.consent}
                    onChange={(e) => setData({ ...data, consent: e.target.checked })}
                    required
                  />
                  <label htmlFor="consent" className="text-sm text-slate-900 dark:text-white font-medium leading-relaxed cursor-pointer">
                    I consent to donate blood and authorize the hospital to collect, test, and process my blood donation. I confirm that I have truthfully answered all health screening questions.
                  </label>
                </div>
              </div>

              {/* Messages */}
              {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3">
                  <svg className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
                </div>
              )}
              {success && (
                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-3">
                  <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <p className="text-emerald-600 dark:text-emerald-400 font-medium">{success}</p>
                </div>
              )}

              {/* Submit Button */}
              <div className="flex gap-4 pt-8 border-t border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex-1 px-6 py-4 rounded-xl font-bold text-lg text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-700/50 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all duration-300 transform hover:-translate-y-1"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 px-6 py-4 rounded-xl font-bold text-lg text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-red-600/50 disabled:to-red-700/50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl shadow-lg group relative overflow-hidden"
                >
                  <span className="relative flex items-center justify-center gap-2">
                    {saving ? (
                      <>
                        <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Saving Profile...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Save Profile
                      </>
                    )}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
