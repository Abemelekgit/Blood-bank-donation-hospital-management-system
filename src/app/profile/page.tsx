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
    <div className="relative mx-auto max-w-3xl px-4 py-8">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-30" style={{backgroundImage: 'url(/bg/dots.svg)', backgroundSize: 'auto', backgroundRepeat: 'repeat'}} />
      <h1 className="text-2xl md:text-3xl font-semibold tracking-tight">Complete your donor profile</h1>
      <p className="text-slate-600 mt-1 mb-4">Provide your details so our clinical team can screen and schedule your donation.</p>
      <Card>
        <CardBody>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Full name</label>
                <input className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-200" value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Blood type</label>
                <select className="w-full border rounded px-3 py-2" value={data.bloodType} onChange={(e) => setData({ ...data, bloodType: e.target.value as BloodType })}>
                  <option value="">Select</option>
                  {(["A_POS","A_NEG","B_POS","B_NEG","AB_POS","AB_NEG","O_POS","O_NEG"] as const).map((bt) => (
                    <option key={bt} value={bt}>{bt.replace("_","+").replace("POS","+ ").replace("NEG","- ")}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Date of birth</label>
                <input type="date" className="w-full border rounded px-3 py-2" value={data.dateOfBirth} onChange={(e) => setData({ ...data, dateOfBirth: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Gender</label>
                <select className="w-full border rounded px-3 py-2" value={data.gender} onChange={(e) => setData({ ...data, gender: e.target.value })}>
                  <option value="">Select</option>
                  <option>Female</option>
                  <option>Male</option>
                  <option>Other</option>
                  <option>Prefer not to say</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Weight (kg)</label>
                <input type="number" min={30} className="w-full border rounded px-3 py-2" value={data.weightKg} onChange={(e) => setData({ ...data, weightKg: e.target.value })} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Address</label>
                <input className="w-full border rounded px-3 py-2" value={data.address} onChange={(e) => setData({ ...data, address: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <input className="w-full border rounded px-3 py-2" value={data.city} onChange={(e) => setData({ ...data, city: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Emergency contact name</label>
                <input className="w-full border rounded px-3 py-2" value={data.emergencyContactName} onChange={(e) => setData({ ...data, emergencyContactName: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Emergency contact phone</label>
                <input className="w-full border rounded px-3 py-2" value={data.emergencyContactPhone} onChange={(e) => setData({ ...data, emergencyContactPhone: e.target.value })} />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Medical notes</label>
                <textarea className="w-full border rounded px-3 py-2" rows={4} value={data.medicalNotes} onChange={(e) => setData({ ...data, medicalNotes: e.target.value })} />
              </div>
              <div className="md:col-span-2 flex items-center gap-2">
                <input id="consent" type="checkbox" className="h-4 w-4" checked={data.consent} onChange={(e) => setData({ ...data, consent: e.target.checked })} />
                <label htmlFor="consent" className="text-sm">I consent to donate blood and to be contacted by the hospital team.</label>
              </div>
              {error && <p className="md:col-span-2 text-red-600 text-sm">{error}</p>}
              {success && <p className="md:col-span-2 text-green-700 text-sm">{success}</p>}
              <div className="md:col-span-2 flex justify-end">
                <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save profile"}</Button>
              </div>
            </form>
          )}
        </CardBody>
      </Card>
    </div>
  );
}
