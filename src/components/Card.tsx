import { ReactNode, ReactElement, isValidElement, cloneElement } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`bg-[var(--surface)] border border-[color:var(--border)] rounded-lg shadow-sm transition-transform duration-200 hover:-translate-y-0.5 ${className}`}>{children}</div>;
}

export function CardBody({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

export function Button({ variant = "primary", children, className = "", asChild, ...props }: any) {
  const base = "inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 transition-colors duration-200";
  const styles: Record<string, string> = {
    primary: "bg-[color:var(--accent)] text-white hover:brightness-95 focus-visible:ring-[color:var(--accent)]",
    secondary: "bg-slate-900 text-white hover:bg-black focus-visible:ring-slate-300",
    outline: "border border-[color:var(--border)] text-[color:var(--text)] hover:bg-white/70 focus-visible:ring-slate-300",
  };
  const merged = [base, styles[variant], className].join(" ");
  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<any>;
    return cloneElement(child, {
      className: [child.props.className, merged].filter(Boolean).join(" "),
      ...props,
    });
  }
  return <button className={merged} {...props}>{children}</button>;
}
