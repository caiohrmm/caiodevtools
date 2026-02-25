export interface Tool {
  slug: string;
  name: string;
  description: string;
  href: string;
  icon?: string;
}

export const TOOLS: Tool[] = [
  {
    slug: "image-converter",
    name: "Conversor de Imagem",
    description: "Converta PNG/JPG para WebP com preview e métricas de redução.",
    href: "/tools/image-converter",
  },
];
