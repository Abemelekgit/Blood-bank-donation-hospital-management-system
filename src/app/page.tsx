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
      {/* Hero - Premium Medical Design */}
      <div className="relative isolate overflow-hidden">
        {/* Premium gradient background - Blue & Crimson */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-900 to-blue-900">
          {/* Animated medical blobs */}
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-red-500/30 to-crimson-500/20 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-blob"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-cyan-400/10 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 w-80 h-80 bg-gradient-to-br from-red-600/25 to-blue-600/15 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-blob animation-delay-4000"></div>
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        </div>

        <Container className="py-20 md:py-40 relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-3 px-4 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 mb-8 hover:bg-white/15 transition-all duration-300">
              <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse"></span>
              <span className="text-xs uppercase tracking-widest text-blue-200 font-bold">🏥 Hospital-Grade Blood Banking</span>
            </div>

            {/* Main heading - Premium typography */}
            <h1 className="mt-8 text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-tight">
              <span className="bg-gradient-to-br from-white via-blue-100 to-white dark:from-white dark:via-blue-200 dark:to-slate-100 bg-clip-text text-transparent">
                Save Lives<br />
                <span className="text-red-500 drop-shadow-lg">Every Day.</span>
              </span>
            </h1>

            {/* Premium subtitle */}
            <p className="mt-8 text-xl md:text-2xl text-blue-100 max-w-3xl leading-relaxed font-light">
              Join our network of lifesavers. Donate blood safely at our state-of-the-art hospital facility. Your donation can save up to 3 lives.
            </p>

            {/* Premium CTA Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row gap-6">
              <Link href="/register" className="group relative inline-flex items-center justify-center px-10 py-5 rounded-2xl text-white font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                {/* Button gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 transition-all duration-300 group-hover:from-red-700 group-hover:to-red-800"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <span className="relative flex items-center gap-3">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292m0 0H8.646m3.354 0H15.354m0 0a4 4 0 110-5.292m0 0l3.354 3.354" />
                  </svg>
                  Donate Now
                  <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>

              <Link href="/login" className="group relative inline-flex items-center justify-center px-10 py-5 rounded-2xl font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm border border-white/30 rounded-2xl group-hover:bg-white/20 transition-all duration-300"></div>
                <span className="relative flex items-center gap-3 text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Staff Portal
                </span>
              </Link>
            </div>

            {/* Enhanced Stats Section */}
            <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 hover:bg-white/15 cursor-default">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">📈</div>
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                    <span className="text-red-300">▶</span>
                  </div>
                </div>
                <div className="text-4xl font-black text-white mb-2">15K+</div>
                <div className="text-blue-200 font-semibold">Active Donors</div>
              </div>

              <div className="group backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 hover:bg-white/15 cursor-default">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">❤️</div>
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                    <span className="text-red-300">▶</span>
                  </div>
                </div>
                <div className="text-4xl font-black text-white mb-2">75K+</div>
                <div className="text-blue-200 font-semibold">Lives Saved</div>
              </div>

              <div className="group backdrop-blur-xl bg-gradient-to-br from-white/10 to-white/5 rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 hover:bg-white/15 cursor-default">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">🏥</div>
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                    <span className="text-red-300">▶</span>
                  </div>
                </div>
                <div className="text-4xl font-black text-white mb-2">24/7</div>
                <div className="text-blue-200 font-semibold">Available</div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* About - Medical Premium */}
      <div className="relative py-20 md:py-32 bg-gradient-to-b from-white via-blue-50/30 to-white dark:from-slate-900 dark:via-blue-950/20 dark:to-slate-900">
        <Container>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-5 py-2 rounded-full bg-red-500/15 text-red-600 dark:text-red-400 text-sm font-bold mb-6 border border-red-500/30">
                ✓ Why Choose Lifeline
              </div>
              <h2 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-8 leading-tight">
                Clinical Excellence, Donor Care
              </h2>
              <p className="text-lg text-black dark:text-white leading-relaxed mb-8 font-medium">
                We combine cutting-edge medical technology with compassionate care. Every donor receives personalized attention from certified healthcare professionals.
              </p>
              <ul className="space-y-5">
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1 border border-red-500/40">
                    <svg className="w-5 h-5 text-red-600 dark:text-red-400 font-bold" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-black dark:text-white text-lg">ISO Certified Staff</h4>
                    <p className="text-black dark:text-white text-sm mt-1 font-semibold">International healthcare standards</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1 border border-red-500/40">
                    <svg className="w-5 h-5 text-red-600 dark:text-red-400 font-bold" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-black dark:text-white text-lg">State-of-the-Art Equipment</h4>
                    <p className="text-black dark:text-white text-sm mt-1 font-semibold">Latest medical technology</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-1 border border-red-500/40">
                    <svg className="w-5 h-5 text-red-600 dark:text-red-400 font-bold" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-black dark:text-white text-lg">HIPAA Compliant Privacy</h4>
                    <p className="text-black dark:text-white text-sm mt-1 font-semibold">Your data is completely secure</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative group">
              <div className="absolute -inset-6 bg-gradient-to-br from-red-500/20 via-blue-500/10 to-red-500/20 rounded-3xl blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative backdrop-blur-2xl bg-gradient-to-br from-white/80 to-blue-50/80 dark:from-slate-800/80 dark:to-blue-900/40 rounded-3xl p-10 border border-white/40 dark:border-white/10 shadow-2xl">
                <div className="space-y-8">
                  <div className="flex items-start gap-5 p-4 bg-red-50/50 dark:bg-red-950/20 rounded-2xl border border-red-200/50 dark:border-red-900/50">
                    <span className="text-4xl">🩸</span>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-1 text-lg">Donor Safety First</h4>
                      <p className="text-slate-700 dark:text-slate-300 text-sm">Health monitoring before, during, and after donation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-5 p-4 bg-blue-50/50 dark:bg-blue-950/20 rounded-2xl border border-blue-200/50 dark:border-blue-900/50">
                    <span className="text-4xl">⚡</span>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-1 text-lg">Rapid Processing</h4>
                      <p className="text-slate-700 dark:text-slate-300 text-sm">Quick screening, efficient scheduling</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-5 p-4 bg-red-50/50 dark:bg-red-950/20 rounded-2xl border border-red-200/50 dark:border-red-900/50">
                    <span className="text-4xl">❤️</span>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-white mb-1 text-lg">Save Multiple Lives</h4>
                      <p className="text-slate-700 dark:text-slate-300 text-sm">Each donation helps up to 3 patients</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* How It Works - Medical Premium */}
      <div className="relative py-20 md:py-32 bg-gradient-to-b from-slate-50 via-white to-blue-50/30 dark:from-slate-800 dark:via-slate-900 dark:to-blue-950/30">
        <Container>
          <div className="text-center mb-16 md:mb-24">
            <div className="inline-block px-5 py-2 rounded-full bg-blue-500/15 text-blue-600 dark:text-blue-400 text-sm font-bold mb-6 border border-blue-500/30">
              🔄 Four Simple Steps
            </div>
            <h2 className="text-5xl md:text-6xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
              Join Our Donor Community
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium">
              Get started in minutes. Becoming a lifesaver has never been easier.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {[
              {
                num: "01",
                title: "Create Account",
                desc: "Sign up with your email or phone number to get started",
                icon: "📝",
                color: "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
                textColor: "text-blue-600 dark:text-blue-400"
              },
              {
                num: "02",
                title: "Complete Profile",
                desc: "Share your health history and blood type information",
                icon: "🩺",
                color: "from-red-500/20 to-pink-500/20 border-red-500/30",
                textColor: "text-red-600 dark:text-red-400"
              },
              {
                num: "03",
                title: "Schedule Visit",
                desc: "Choose a convenient time to visit our donation center",
                icon: "📅",
                color: "from-amber-500/20 to-orange-500/20 border-amber-500/30",
                textColor: "text-amber-600 dark:text-amber-400"
              },
              {
                num: "04",
                title: "Donate & Help",
                desc: "Complete screening and donate blood to save lives",
                icon: "❤️",
                color: "from-emerald-500/20 to-teal-500/20 border-emerald-500/30",
                textColor: "text-emerald-600 dark:text-emerald-400"
              }
            ].map((step, i) => (
              <div key={i} className="group">
                <div className={`relative h-full backdrop-blur-xl bg-gradient-to-br ${step.color} rounded-2xl p-8 border transition-all duration-300 hover:shadow-2xl hover:scale-105 cursor-pointer`}>
                  <div className="absolute top-4 right-4 text-5xl opacity-20 group-hover:opacity-40 transition-opacity">
                    {step.icon}
                  </div>
                  <div className={`text-5xl font-black ${step.textColor} mb-4 opacity-70 group-hover:opacity-100 transition-opacity`}>
                    {step.num}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-20 pt-20 border-t border-slate-200 dark:border-slate-700">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="inline-block p-6 rounded-full bg-red-500/15 mb-6 border border-red-500/30 group-hover:bg-red-500/25 transition-colors">
                  <svg className="w-10 h-10 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Less Than 1 Hour</h4>
                <p className="text-slate-600 dark:text-slate-400">Quick screening and donation process</p>
              </div>
              <div className="text-center group">
                <div className="inline-block p-6 rounded-full bg-blue-500/15 mb-6 border border-blue-500/30 group-hover:bg-blue-500/25 transition-colors">
                  <svg className="w-10 h-10 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Health Checked</h4>
                <p className="text-slate-600 dark:text-slate-400">Professional medical screening included</p>
              </div>
              <div className="text-center group">
                <div className="inline-block p-6 rounded-full bg-emerald-500/15 mb-6 border border-emerald-500/30 group-hover:bg-emerald-500/25 transition-colors">
                  <svg className="w-10 h-10 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h-2m0 0h-2m2 0V8m0 2v2m6 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Zero Cost</h4>
                <p className="text-slate-600 dark:text-slate-400">Completely free - pure act of humanity</p>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* For staff - Medical Premium */}
      {isStaff && (
        <div className="relative py-20 md:py-32 bg-gradient-to-b from-white via-blue-50/20 to-white dark:from-slate-900 dark:via-blue-950/10 dark:to-slate-900">
          <Container>
            <div className="relative backdrop-blur-2xl bg-gradient-to-br from-blue-900 via-slate-900 to-blue-900 dark:from-slate-800 dark:via-slate-900 dark:to-slate-800 rounded-3xl p-12 md:p-16 border border-white/20 overflow-hidden">
              {/* Animated medical blobs */}
              <div className="absolute inset-0">
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-red-500/15 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-400/15 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
              </div>
              <div className="relative z-10 max-w-3xl">
                <div className="inline-block px-5 py-2 rounded-full bg-red-500/20 text-red-300 text-sm font-bold mb-6 border border-red-500/40">
                  👨‍⚕️ Staff Portal
                </div>
                <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
                  Manage Donors <span className="text-red-400">with Confidence</span>
                </h2>
                <p className="text-xl text-blue-100 mb-10 font-medium leading-relaxed">
                  Authorized medical staff can securely search donor records by phone number or full name. Our system is designed for speed, accuracy, and privacy during intake screening.
                </p>
                <Link href="/admin/panel" className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:-translate-y-2 group">
                  <svg className="w-6 h-6 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Open Admin Panel</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </Container>
        </div>
      )}

      {/* CTA - Final Medical Premium */}
      <div className="relative py-20 md:py-32 bg-gradient-to-b from-slate-50 to-white dark:from-slate-800 dark:to-slate-900">
        <Container>
          <div className="relative backdrop-blur-2xl bg-gradient-to-br from-red-600 via-red-700 to-red-800 rounded-3xl p-12 md:p-16 border border-red-500/50 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full mix-blend-screen filter blur-3xl opacity-30 animate-blob"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full mix-blend-screen filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <h3 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight">
                  Ready to Save Lives?
                </h3>
                <p className="text-lg text-red-100 leading-relaxed font-medium">
                  Your blood donation can save up to 3 lives. Join our network of heroes today. It's safe, simple, and truly makes a difference.
                </p>
              </div>
              <Link href="/register" className="group inline-flex items-center justify-center px-10 py-5 rounded-2xl bg-white text-red-700 font-bold text-lg shadow-2xl hover:shadow-3xl transform transition-all duration-300 hover:-translate-y-2 hover:scale-105 whitespace-nowrap">
                <svg className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292m0 0H8.646m3.354 0H15.354m0 0a4 4 0 110-5.292m0 0l3.354 3.354" />
                </svg>
                <span>Start Donating Now</span>
                <svg className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
