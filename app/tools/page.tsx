import type { Metadata } from "next";
import { ToolCard } from "@/components/ToolCard";
import { TOOLS } from "@/lib/tools";

export const metadata: Metadata = {
  title: "Ferramentas",
  description:
    "Lista de ferramentas online gratuitas: conversor de imagem para WebP e mais. Use direto no navegador.",
  openGraph: {
    title: "Ferramentas | Caio Tools",
    description:
      "Lista de ferramentas online gratuitas: conversor de imagem para WebP e mais.",
  },
};

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white sm:text-3xl">
        Ferramentas
      </h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-400">
        Escolha uma ferramenta para começar. Todas são gratuitas e funcionam no navegador.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </div>
  );
}
