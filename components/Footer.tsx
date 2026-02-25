import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-neutral-900/50">
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-between">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            © {new Date().getFullYear()} Caio Tools. Ferramentas online gratuitas.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="/tools"
              className="text-sm font-medium text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white"
            >
              Ver ferramentas
            </Link>
            <a
              href="mailto:contato@caiotools.com"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              Entre em contato
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
