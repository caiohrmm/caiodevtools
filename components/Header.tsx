import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/90">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="text-lg font-semibold text-neutral-900 dark:text-white"
        >
          Caio Tools
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
          >
            Início
          </Link>
          <Link
            href="/tools"
            className="text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white"
          >
            Ferramentas
          </Link>
        </nav>
      </div>
    </header>
  );
}
