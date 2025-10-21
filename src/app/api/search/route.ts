import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

function hasStaffRole(role?: string) {
  return role === "NURSE" || role === "DOCTOR" || role === "ADMIN";
}

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user || !hasStaffRole(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const phone = searchParams.get("phone");
  const name = searchParams.get("name");

  if (!phone && !name) {
    return NextResponse.json({ error: "Provide phone or name query param" }, { status: 400 });
  }

  const users = await prisma.user.findMany({
    where: {
      role: "CLIENT",
      AND: [
        phone ? { phone: { contains: phone } } : {},
        name ? { name: { contains: name, mode: "insensitive" } } : {},
      ],
    },
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, email: true, phone: true, role: true, createdAt: true },
    take: 25,
  });

  return NextResponse.json({ results: users });
}
