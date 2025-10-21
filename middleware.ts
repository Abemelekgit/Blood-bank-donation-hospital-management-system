import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

function hasStaffRole(role?: string) {
  return role === "NURSE" || role === "DOCTOR" || role === "ADMIN";
}

export async function middleware(req: NextRequest) {
  // Ensure favicon uses our red blood drop SVG
  if (req.nextUrl.pathname === "/favicon.ico") {
    return NextResponse.rewrite(new URL("/icon.svg", req.url));
  }

  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const email = (token as any)?.email as string | undefined;
  const isHardcodedStaff = email?.toLowerCase() === "staff@bloodline.et";
  if (req.nextUrl.pathname.startsWith("/admin") && !isHardcodedStaff) {
    const url = new URL("/login", req.url);
    url.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
