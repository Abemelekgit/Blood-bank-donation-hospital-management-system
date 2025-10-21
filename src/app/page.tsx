import Link from "next/link";
import { Container, Section } from "@/components/ui";
import { Card, CardBody, Button } from "@/components/Card";
import { IconDrop, IconShield, IconClock } from "@/components/Icon";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const role = (session as any)?.user?.role as string | undefined;
  const isStaff = role === "NURSE" || role === "DOCTOR" || role === "ADMIN";
  return (
    <div className="">
      {/* Hero */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-white to-red-50">
        <Container className="py-14 md:py-20">
          <div className="max-w-3xl">
            <p className="text-xs uppercase tracking-widest text-red-700 font-semibold">Lifeline Blood Bank</p>
            <h1 className="mt-2 text-3xl md:text-5xl font-semibold tracking-tight text-slate-900">
              Donate blood. Save lives.
            </h1>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Our hospital-managed blood bank connects compassionate donors with patients in need. Register in minutes, and our clinical team will guide you through a safe and professional donation experience.
            </p>
            <div className="mt-6 flex gap-3">
              <Button asChild>
                <Link href="/register">Donate blood</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/login">Staff sign in</Link>
              </Button>
            </div>
            <p className="mt-3 text-sm text-slate-500">
              Every donation can help up to three patients—thank you for making a difference.
            </p>
          </div>
        </Container>
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-80">
          <div className="absolute inset-x-0 bottom-0 h-[280px]" style={{backgroundImage: 'url(/bg/hero-waves.svg)', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'bottom'}} />
        </div>
      </div>

      {/* About */}
      <Section eyebrow="About" title="Clinical-grade safety and care">
        <p>
          We follow internationally recognized standards for donor screening, collection, and storage. Our nurses and doctors oversee every step, ensuring a safe and respectful experience for every donor.
          Your information is protected and used only to coordinate your donation and notify you of opportunities to help.
        </p>
      </Section>

      {/* How it works */}
      <Section eyebrow="How it works" title="Simple, transparent donation process">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardBody>
              <IconDrop className="h-6 w-6 text-red-600" />
              <h3 className="mt-2 font-medium text-slate-900">1. Register</h3>
              <p className="text-slate-700 text-sm mt-1">Share your name, email, and phone number so our team can contact you to schedule your donation.</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <IconShield className="h-6 w-6 text-red-600" />
              <h3 className="mt-2 font-medium text-slate-900">2. Screen</h3>
              <p className="text-slate-700 text-sm mt-1">A clinician will review eligibility, explain the procedure, and answer any questions you have.</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <IconClock className="h-6 w-6 text-red-600" />
              <h3 className="mt-2 font-medium text-slate-900">3. Donate</h3>
              <p className="text-slate-700 text-sm mt-1">Donate at our hospital center. The process typically takes less than an hour including recovery.</p>
            </CardBody>
          </Card>
        </div>
      </Section>

      {/* For staff */}
      {isStaff && (
        <Section eyebrow="For clinical staff" title="Search donors quickly and accurately">
          <p>
            Authorized staff can securely look up donor records by phone number or full name. Designed for speed and accuracy during intake, with role-based access for nurses, doctors, and administrators.
          </p>
          <div className="mt-4">
            <Link href="/admin/panel" className="inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-white font-medium shadow hover:bg-black">Open admin search</Link>
          </div>
        </Section>
      )}

      {/* CTA */}
      <div className="bg-white border-t">
        <Container className="py-10 md:py-14">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-semibold text-slate-900">Ready to help a patient today?</h3>
              <p className="text-slate-600">Your donation is a lifeline. It’s safe, guided by medical professionals, and it truly matters.</p>
            </div>
            <Button asChild>
              <Link href="/register">Donate blood</Link>
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
}
