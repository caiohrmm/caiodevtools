"use client";

import { useCallback, useState } from "react";

const SIZE = 256;
const MARGIN = 2;

export function QrGeneratorClient() {
  const [text, setText] = useState("");
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = useCallback(async () => {
    const trimmed = text.trim();
    if (!trimmed) {
      setError("Digite um texto ou URL.");
      setDataUrl(null);
      return;
    }
    setError(null);
    setLoading(true);
    try {
      const QRCode = (await import("qrcode")).default;
      const url = await QRCode.toDataURL(trimmed, {
        width: SIZE,
        margin: MARGIN,
        color: { dark: "#0a0a0a", light: "#ffffff" },
      });
      setDataUrl(url);
    } catch {
      setError("Não foi possível gerar o QR Code. Tente outro texto.");
      setDataUrl(null);
    } finally {
      setLoading(false);
    }
  }, [text]);

  const handleClear = useCallback(() => {
    setText("");
    setDataUrl(null);
    setError(null);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="qr-input" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Texto ou URL
        </label>
        <textarea
          id="qr-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="https://exemplo.com ou qualquer texto"
          rows={3}
          className="mt-2 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder-neutral-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-600 dark:bg-neutral-800 dark:text-white dark:placeholder-neutral-400"
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleGenerate}
          disabled={loading}
          className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          {loading ? "Gerando…" : "Gerar QR Code"}
        </button>
        <button
          type="button"
          onClick={handleClear}
          className="rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
        >
          Limpar
        </button>
      </div>

      {error && (
        <p className="text-sm font-medium text-red-600 dark:text-red-400">{error}</p>
      )}

      {dataUrl && (
        <section className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900/50">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
            Seu QR Code
          </h2>
          <div className="mt-4 flex flex-col items-center gap-4 sm:flex-row sm:items-start">
            <div className="flex-shrink-0 overflow-hidden rounded-lg border border-neutral-200 bg-white p-2 dark:border-neutral-600 dark:bg-white">
              <img
                src={dataUrl}
                alt="QR Code gerado"
                width={SIZE}
                height={SIZE}
                className="h-auto w-full max-w-[256px]"
              />
            </div>
            <div className="flex flex-col gap-2">
              <a
                href={dataUrl}
                download="qrcode.png"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Baixar PNG
              </a>
              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center justify-center rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
              >
                Gerar outro
              </button>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
