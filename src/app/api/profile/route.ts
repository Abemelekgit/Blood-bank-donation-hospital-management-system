import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/db";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      profile: true,
    },
  });
  return NextResponse.json({ user });
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Invalid body" }, { status: 400 });

  const {
    name,
    bloodType,
    dateOfBirth, // ISO string
    gender,
    weightKg,
    address,
    city,
    emergencyContactName,
    emergencyContactPhone,
    medicalNotes,
    consent,
  } = body ?? {};

  // Update name (optional)
  if (typeof name === "string" && name.trim().length > 1) {
    await prisma.user.update({ where: { id: session.user.id }, data: { name: name.trim() } });
  }

  const profile = await prisma.donorProfile.upsert({
    where: { userId: session.user.id },
    update: {
      bloodType: bloodType ?? undefined,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
      gender: gender ?? undefined,
      weightKg: typeof weightKg === "number" ? weightKg : undefined,
      address: address ?? undefined,
      city: city ?? undefined,
      emergencyContactName: emergencyContactName ?? undefined,
      emergencyContactPhone: emergencyContactPhone ?? undefined,
      medicalNotes: medicalNotes ?? undefined,
      consent: typeof consent === "boolean" ? consent : undefined,
    },
    create: {
      userId: session.user.id,
      bloodType: bloodType ?? null,
      dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : null,
      gender: gender ?? null,
      weightKg: typeof weightKg === "number" ? weightKg : null,
      address: address ?? null,
      city: city ?? null,
      emergencyContactName: emergencyContactName ?? null,
      emergencyContactPhone: emergencyContactPhone ?? null,
      medicalNotes: medicalNotes ?? null,
      consent: !!consent,
    },
  });

  return NextResponse.json({ ok: true, profile });
}
