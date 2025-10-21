import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { z } from "zod";

const RegisterSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7).max(20),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = RegisterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input", details: parsed.error.flatten() }, { status: 400 });
  }
  const { name, email, phone, password } = parsed.data;

  // Prevent registering the reserved staff email
  if (email.toLowerCase() === "staff@bloodline.et") {
    return NextResponse.json({ error: "This email is reserved for staff access" }, { status: 400 });
  }

  const existing = await prisma.user.findFirst({ where: { OR: [{ email }, { phone }] } });
  if (existing) {
    return NextResponse.json({ error: "Email or phone already registered" }, { status: 409 });
  }

  const hash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { name, email, phone, password: hash },
    select: { id: true, name: true, email: true, phone: true, role: true, createdAt: true },
  });
  return NextResponse.json(user, { status: 201 });
}
