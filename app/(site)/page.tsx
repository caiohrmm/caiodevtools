import Link from "next/link";
import { ToolCard } from "@/components/ToolCard";
import { TOOLS } from "@/lib/tools";

export default function HomePage() {
  return (
    <div>
      <section className="border-b border-neutral-200 bg-neutral-50/50 dark:border-neutral-800 dark:bg-neutral-900/30">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20">
          <h1 className="text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
            Ferramentas online que facilitam o dia a dia
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
            Converta imagens, otimize arquivos e use outras ferramentas úteis direto no
            navegador. Sem instalação, sem custo.
          </p>
          <Link
            href="/tools"
            className="mt-6 inline-flex items-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Ver todas as ferramentas
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16">
        <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
          Ferramentas disponíveis
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-neutral-50/50 dark:border-neutral-800 dark:bg-neutral-900/30">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-16 text-center">
          <h2 className="text-xl font-semibold text-neutral-900 dark:text-white">
            Precisa de uma solução sob medida?
          </h2>
          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            Desenvolvimento web e ferramentas personalizadas para seu negócio.
          </p>
          <a
            href="mailto:contato@caiotools.com"
            className="mt-4 inline-flex rounded-lg border-2 border-blue-600 px-5 py-2.5 text-sm font-medium text-blue-600 hover:bg-blue-50 dark:border-blue-500 dark:text-blue-400 dark:hover:bg-blue-950/50"
          >
            Entre em contato
          </a>
        </div>
      </section>
    </div>
  );
}
