import { Container } from "./ui";

export function Footer() {
  return (
    <footer className="border-t bg-white">
      <Container className="py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="text-slate-600 text-sm">
            <div className="font-semibold text-slate-900">Lifeline Blood Bank</div>
            <div>© {new Date().getFullYear()} All rights reserved.</div>
          </div>
          <div className="text-sm text-slate-600">
            <a href="/register" className="underline underline-offset-4">Become a donor</a>
            <span className="mx-2">·</span>
            <a href="/login" className="underline underline-offset-4">Staff sign in</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
