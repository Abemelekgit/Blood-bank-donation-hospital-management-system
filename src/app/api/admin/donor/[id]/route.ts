import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  _req: Request,
  ctx: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email?.toLowerCase();
  if (!email || email !== "staff@bloodline.et") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { params } = await Promise.resolve(ctx);
  const userId = params.id;
  if (!userId) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      createdAt: true,
      profile: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ user });
}
