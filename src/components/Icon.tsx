export function IconDrop({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.66 2.58a1 1 0 0 0-1.32 0C8.26 5.2 5 9.34 5 13a7 7 0 0 0 14 0c0-3.66-3.26-7.8-6.34-10.42Z" />
    </svg>
  );
}

export function IconShield({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2 4 6v6c0 5 3.4 9.3 8 10 4.6-.7 8-5 8-10V6l-8-4Z" />
    </svg>
  );
}

export function IconClock({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 10.4 3.2 1.9-.9 1.5L11 13V7h2v5.4Z" />
    </svg>
  );
}
