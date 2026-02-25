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
    description: "Converta PNG e JPG para WebP com otimização de tamanho e qualidade.",
    href: "/tools/image-converter",
  },
];
