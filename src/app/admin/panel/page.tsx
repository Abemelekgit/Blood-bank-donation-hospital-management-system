"use client";
import { useState } from "react";

type User = { id: string; name: string; email: string; phone: string; role: string; createdAt: string };
type DonorProfile = {
  bloodType?: string | null;
  dateOfBirth?: string | null;
  gender?: string | null;
  weightKg?: number | null;
  address?: string | null;
  city?: string | null;
  emergencyContactName?: string | null;
  emergencyContactPhone?: string | null;
  medicalNotes?: string | null;
  consent?: boolean;
  updatedAt?: string;
  createdAt?: string;
} | null;
type FullUser = User & { profile: DonorProfile };

export default function AdminPanelPage() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<User[]>([]);
  const [selected, setSelected] = useState<FullUser | null>(null);
  const [detailsError, setDetailsError] = useState<string | null>(null);

  async function search() {
    setLoading(true);
    setError(null);
    setResults([]);
    const params = new URLSearchParams();
    if (phone) params.set("phone", phone);
    if (name) params.set("name", name);
    const res = await fetch(`/api/search?${params.toString()}`);
    setLoading(false);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Search failed");
      return;
    }
    const data = await res.json();
    setResults(data.results ?? []);
  }

  async function openDetails(userId: string) {
    setDetailsError(null);
    setSelected(null);
    const res = await fetch(`/api/admin/donor/${userId}`);
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setDetailsError(data.error ?? "Failed to load details");
      return;
    }
    const data = await res.json();
    setSelected(data.user as FullUser);
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white via-blue-50 to-white dark:from-slate-900 dark:via-blue-950/20 dark:to-slate-900">
      {/* Animated background blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-red-500/20 to-red-500/10 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-400/15 to-blue-400/5 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-12 md:py-20">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-block px-5 py-2 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 text-sm font-bold mb-6 border border-blue-500/30">
            🔍 Donor Search
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-4 leading-tight">
            Find <span className="text-red-600 dark:text-red-500">Donors</span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 font-medium">
            Search donor records by phone number (recommended) or full name
          </p>
        </div>

        {/* Search Card */}
        <div className="backdrop-blur-2xl bg-white/80 dark:bg-slate-800/40 rounded-3xl p-8 border border-white/40 dark:border-white/10 shadow-2xl mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
            <div>
              <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">Phone Number (Recommended)</label>
              <input
                className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+251-911-234567"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-900 dark:text-white mb-3">Full Name (Optional)</label>
              <input
                className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jane Doe"
              />
            </div>
            <button
              onClick={search}
              disabled={loading}
              className="px-8 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:from-red-600/50 disabled:to-red-700/50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl shadow-lg flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Searching...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Search
                </>
              )}
            </button>
          </div>
          {error && (
            <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3">
              <svg className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-600 dark:text-red-400 font-medium">{error}</p>
            </div>
          )}
        </div>

        {/* Results Table */}
        <div className="backdrop-blur-2xl bg-white/80 dark:bg-slate-800/40 rounded-3xl border border-white/40 dark:border-white/10 shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-blue-500/10 to-red-500/10">
                  <th className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Name</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Email</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Phone</th>
                  <th className="px-6 py-4 text-sm font-bold text-slate-900 dark:text-white">Registered</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <svg className="w-8 h-8 text-red-600 dark:text-red-400 animate-spin mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        <p className="text-slate-600 dark:text-slate-300 font-medium">Searching donors...</p>
                      </div>
                    </td>
                  </tr>
                ) : results.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center">
                      <p className="text-slate-500 dark:text-slate-400">No donors found. Try a different search.</p>
                    </td>
                  </tr>
                ) : (
                  results.map((u) => (
                    <tr
                      key={u.id}
                      className="border-b border-slate-200 dark:border-slate-700 hover:bg-red-500/5 dark:hover:bg-red-950/20 cursor-pointer transition-colors duration-300"
                      onClick={() => openDetails(u.id)}
                      title="Click to view full details"
                    >
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900 dark:text-white">{u.name}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{u.email}</td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{u.phone}</td>
                      <td className="px-6 py-4 text-slate-600 dark:text-slate-300 text-sm">
                        {new Date(u.createdAt).toLocaleDateString()} {new Date(u.createdAt).toLocaleTimeString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {(selected || detailsError) && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="w-full max-w-2xl backdrop-blur-2xl bg-gradient-to-br from-white/95 to-blue-50/95 dark:from-slate-800/95 dark:to-slate-900/95 rounded-3xl shadow-2xl border border-white/40 dark:border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="border-b border-slate-200 dark:border-slate-700 px-8 py-6 flex items-center justify-between bg-gradient-to-r from-blue-500/10 to-red-500/10">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                </svg>
                Donor Details
              </h2>
              <button
                className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
                onClick={() => setSelected(null)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            {detailsError ? (
              <div className="p-8 text-center">
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3 justify-center">
                  <svg className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-red-600 dark:text-red-400 font-medium">{detailsError}</p>
                </div>
              </div>
            ) : !selected ? (
              <div className="p-8 text-center">
                <svg className="w-8 h-8 text-red-600 dark:text-red-400 animate-spin mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <p className="text-slate-600 dark:text-slate-300 font-medium">Loading donor details...</p>
              </div>
            ) : (
              <div className="p-8 space-y-6 max-h-[70vh] overflow-y-auto">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <span>👤</span> Basic Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DetailField label="Name" value={selected.name} />
                    <DetailField label="Email" value={selected.email} />
                    <DetailField label="Phone" value={selected.phone} />
                    <DetailField label="Registered" value={new Date(selected.createdAt).toLocaleString()} />
                  </div>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <span>🩸</span> Medical Profile
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DetailField label="Blood Type" value={selected.profile?.bloodType ?? "—"} />
                    <DetailField label="Gender" value={selected.profile?.gender ?? "—"} />
                    <DetailField label="Date of Birth" value={selected.profile?.dateOfBirth ? new Date(selected.profile.dateOfBirth).toLocaleDateString() : "—"} />
                    <DetailField label="Weight (kg)" value={selected.profile?.weightKg?.toString() ?? "—"} />
                  </div>
                </div>

                <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                    <span>📍</span> Contact & Address
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <DetailField label="Address" value={selected.profile?.address ?? "—"} />
                    <DetailField label="City" value={selected.profile?.city ?? "—"} />
                    <DetailField label="Emergency Contact" value={selected.profile?.emergencyContactName ?? "—"} />
                    <DetailField label="Emergency Phone" value={selected.profile?.emergencyContactPhone ?? "—"} />
                  </div>
                </div>

                {selected.profile?.medicalNotes && (
                  <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                      <span>⚕️</span> Medical Notes
                    </h3>
                    <div className="p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/50 dark:border-blue-900/50">
                      <p className="text-slate-700 dark:text-slate-300 text-sm whitespace-pre-wrap leading-relaxed">
                        {selected.profile.medicalNotes}
                      </p>
                    </div>
                  </div>
                )}

                <div className="border-t border-slate-200 dark:border-slate-700 pt-6">
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/50 dark:border-emerald-900/50">
                    <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        Consent Status: {selected.profile?.consent ? "✓ Approved" : "✗ Not Provided"}
                      </p>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                        {selected.profile?.updatedAt && `Last updated: ${new Date(selected.profile.updatedAt).toLocaleString()}`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function DetailField({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-widest font-bold text-slate-600 dark:text-slate-400 mb-2">{label}</p>
      <p className="text-sm font-medium text-slate-900 dark:text-white bg-white/50 dark:bg-slate-700/30 rounded-lg px-3 py-2 border border-slate-200 dark:border-slate-600">
        {value ?? "—"}
      </p>
    </div>
  );
}
