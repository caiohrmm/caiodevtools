import Link from "next/link";
import type { Tool } from "@/lib/tools";

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link
      href={tool.href}
      className="group block rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:border-neutral-300 hover:shadow-md dark:border-neutral-700 dark:bg-neutral-900 dark:hover:border-neutral-600"
    >
      <h3 className="font-semibold text-neutral-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
        {tool.name}
      </h3>
      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
        {tool.description}
      </p>
      <span className="mt-2 inline-block text-sm font-medium text-blue-600 dark:text-blue-400">
        Usar ferramenta →
      </span>
    </Link>
  );
}
