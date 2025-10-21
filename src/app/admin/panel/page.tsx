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
    <div className="relative mx-auto max-w-6xl px-4 py-8">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30" style={{backgroundImage: 'url(/bg/crosses.svg)', backgroundSize: 'auto', backgroundRepeat: 'repeat'}} />
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900">Admin panel</h1>
      <p className="text-slate-600 mt-1 mb-4">Find registered donors by phone number (recommended) or full name.</p>
      <div className="bg-white p-4 rounded-lg shadow border mb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium mb-1">Phone (recommended)</label>
            <input className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-200" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="e.g. +2519..." />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Full name (optional)</label>
            <input className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-200" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Jane Doe" />
          </div>
          <div className="flex items-end">
            <button onClick={search} className="w-full rounded-md bg-slate-900 text-white py-2 font-medium shadow hover:bg-black">Search</button>
          </div>
        </div>
        {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
      </div>
      <div className="bg-white rounded-lg shadow border">
        <table className="w-full text-left">
          <thead className="border-b bg-slate-50">
            <tr>
              <th className="p-3 text-sm font-medium text-slate-700">Name</th>
              <th className="p-3 text-sm font-medium text-slate-700">Email</th>
              <th className="p-3 text-sm font-medium text-slate-700">Phone</th>
              <th className="p-3 text-sm font-medium text-slate-700">Registered</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td className="p-3" colSpan={4}>Loading...</td></tr>
            ) : results.length === 0 ? (
              <tr><td className="p-3" colSpan={4}>No results</td></tr>
            ) : (
              results.map((u) => (
                <tr
                  key={u.id}
                  className="border-b hover:bg-slate-50 cursor-pointer"
                  onClick={() => openDetails(u.id)}
                  title="View full details"
                >
                  <td className="p-3">{u.name}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.phone}</td>
                  <td className="p-3">{new Date(u.createdAt).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Details modal */}
      {(selected || detailsError) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => setSelected(null)}>
          <div className="w-full max-w-xl rounded-lg bg-white shadow-lg" onClick={(e) => e.stopPropagation()}>
            <div className="border-b px-4 py-3 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-slate-900">Donor details</h2>
              <button className="text-slate-500 hover:text-slate-900" onClick={() => setSelected(null)}>Close</button>
            </div>
            {detailsError ? (
              <div className="p-4 text-red-600 text-sm">{detailsError}</div>
            ) : !selected ? (
              <div className="p-4 text-sm text-slate-600">Loading details…</div>
            ) : (
              <div className="p-4 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Field label="Name" value={selected.name} />
                  <Field label="Email" value={selected.email} />
                  <Field label="Phone" value={selected.phone} />
                  <Field label="Registered" value={new Date(selected.createdAt).toLocaleString()} />
                  <Field label="Blood type" value={selected.profile?.bloodType ?? "—"} />
                  <Field label="Gender" value={selected.profile?.gender ?? "—"} />
                  <Field label="DOB" value={selected.profile?.dateOfBirth ? new Date(selected.profile.dateOfBirth).toLocaleDateString() : "—"} />
                  <Field label="Weight (kg)" value={selected.profile?.weightKg?.toString() ?? "—"} />
                  <Field label="Address" value={selected.profile?.address ?? "—"} />
                  <Field label="City" value={selected.profile?.city ?? "—"} />
                  <Field label="Emergency contact" value={selected.profile?.emergencyContactName ?? "—"} />
                  <Field label="Emergency phone" value={selected.profile?.emergencyContactPhone ?? "—"} />
                  <Field label="Consent" value={selected.profile?.consent ? "Yes" : "No"} />
                </div>
                {selected.profile?.medicalNotes && (
                  <div>
                    <div className="text-sm font-medium text-slate-700">Medical notes</div>
                    <div className="text-sm text-slate-800 whitespace-pre-wrap border rounded p-2 bg-slate-50">{selected.profile.medicalNotes}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function Field({ label, value }: { label: string; value?: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wide text-slate-500">{label}</div>
      <div className="text-sm text-slate-800">{value ?? "—"}</div>
    </div>
  );
}
