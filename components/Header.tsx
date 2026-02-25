import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/90 backdrop-blur dark:border-neutral-800 dark:bg-neutral-950/90">
      <div className="mx-auto flex h-12 min-h-12 max-w-5xl items-center justify-between gap-3 pr-4 sm:h-14 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            src="/logo.png"
            alt="Caio Tools"
            width={200}
            height={200}
            className="h-[200px] w-[200px] object-contain"
            priority
          />
          
        </Link>
        <nav className="flex shrink-0 items-center gap-4 sm:gap-6">
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
