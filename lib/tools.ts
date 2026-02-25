export interface Tool {
  slug: string;
  name: string;
  description: string;
  href: string;
  icon?: string;
  image?: string;
}

export const TOOLS: Tool[] = [
  {
    slug: "image-converter",
    name: "Conversor de Imagem",
    description: "Converta PNG/JPG para WebP com preview e métricas de redução.",
    href: "/tools/image-converter",
    image: "/tools/conversorimagem.png",
  },
  {
    slug: "qr-generator",
    name: "Gerador de QR Code",
    description: "Gere QR Code a partir de URL ou texto e baixe em PNG.",
    href: "/tools/qr-generator",
    image: "/tools/qrgenerator.png",
  },
];
