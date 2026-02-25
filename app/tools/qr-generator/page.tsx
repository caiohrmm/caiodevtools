import type { Metadata } from "next";
import { QrGeneratorClient } from "./QrGeneratorClient";

export const metadata: Metadata = {
  title: "Gerador de QR Code",
  description:
    "Gere QR Code a partir de URL ou qualquer texto. Baixe em PNG grátis, sem instalação.",
  openGraph: {
    title: "Gerador de QR Code | Caio Tools",
    description:
      "Gere QR Code a partir de URL ou texto e baixe em PNG. Grátis e online.",
  },
};

export default function QrGeneratorPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="text-2xl font-bold text-neutral-900 dark:text-white sm:text-3xl">
        Gerador de QR Code
      </h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-400">
        Digite uma URL ou qualquer texto e gere um QR Code. Baixe em PNG para usar onde quiser.
      </p>

      <div className="mt-8">
        <QrGeneratorClient />
      </div>
    </div>
  );
}
