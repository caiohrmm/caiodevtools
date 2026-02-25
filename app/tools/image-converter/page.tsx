import type { Metadata } from "next";
import { ImageConverterClient } from "./ImageConverterClient";

export const metadata: Metadata = {
  title: "Conversor de Imagem para WebP",
  description:
    "Converta PNG e JPG para WebP online. Reduza o tamanho das imagens mantendo boa qualidade. Grátis e sem instalação.",
  openGraph: {
    title: "Conversor de Imagem para WebP | Caio Tools",
    description:
      "Converta PNG e JPG para WebP online. Reduza o tamanho das imagens mantendo boa qualidade.",
  },
};

export default function ImageConverterPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white sm:text-3xl">
        Conversor de Imagem para WebP
      </h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-400">
        Converta PNG e JPG para WebP com preview e métricas de redução. Até 5MB por
        arquivo.
      </p>

      <div className="mt-8">
        <ImageConverterClient />
      </div>
    </div>
  );
}
