import { ReactNode } from "react";

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto max-w-6xl px-4 ${className}`}>{children}</div>;
}

export function Section({ title, eyebrow, children, className = "" }: { title: string; eyebrow?: string; children: ReactNode; className?: string }) {
  return (
    <section className={`py-10 md:py-14 ${className}`}>
      <Container>
        {eyebrow && <p className="text-xs uppercase tracking-widest text-red-700 font-semibold mb-2">{eyebrow}</p>}
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-slate-900 mb-4">{title}</h2>
        <div className="text-slate-700 leading-relaxed">{children}</div>
      </Container>
    </section>
  );
}
