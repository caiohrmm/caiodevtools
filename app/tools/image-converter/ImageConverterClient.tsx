"use client";

import { useCallback, useEffect, useState } from "react";
import { UploadDropzone, type DropzoneStatus } from "@/components/UploadDropzone";
import { validateFile } from "@/lib/image-converter-constants";
import {
  uploadToCloudinary,
  getWebPTransformUrl,
  getCloudinaryConfig,
} from "@/lib/cloudinary";
import { formatBytesShort } from "@/utils/formatBytes";

type ResultState = {
  originalSize: number;
  webpSize: number;
  webpBlobUrl: string;
  reductionPercent: number;
};

const QUALITY_MIN = 30;
const QUALITY_MAX = 95;
const QUALITY_DEFAULT = 80;

function getReductionPercent(original: number, converted: number): number {
  if (original <= 0) return 0;
  return Math.round(((original - converted) / original) * 100);
}

export function ImageConverterClient() {
  const [status, setStatus] = useState<DropzoneStatus>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [originalPreviewUrl, setOriginalPreviewUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [secureUrl, setSecureUrl] = useState<string | null>(null);
  const [quality, setQuality] = useState(QUALITY_DEFAULT);
  const [result, setResult] = useState<ResultState | null>(null);
  const [qualityLoading, setQualityLoading] = useState(false);

  const { isConfigured } = getCloudinaryConfig();

  const revokePreviewUrl = useCallback(() => {
    if (originalPreviewUrl) {
      URL.revokeObjectURL(originalPreviewUrl);
      setOriginalPreviewUrl(null);
    }
  }, [originalPreviewUrl]);

  const revokeWebpBlobUrl = useCallback(() => {
    if (result?.webpBlobUrl) {
      URL.revokeObjectURL(result.webpBlobUrl);
    }
  }, [result?.webpBlobUrl]);

  const fetchWebPBlob = useCallback(
    async (webpUrl: string): Promise<{ blob: Blob; size: number }> => {
      const res = await fetch(webpUrl);
      if (!res.ok) throw new Error("Falha ao gerar WebP.");
      const blob = await res.blob();
      return { blob, size: blob.size };
    },
    []
  );

  const applyConversion = useCallback(
    async (url: string, q: number) => {
      const webpUrl = getWebPTransformUrl(url, q);
      const { blob, size } = await fetchWebPBlob(webpUrl);
      const blobUrl = URL.createObjectURL(blob);
      return { webpBlobUrl: blobUrl, webpSize: size };
    },
    [fetchWebPBlob]
  );

  const onFileSelect = useCallback(
    async (selectedFile: File) => {
      const validation = validateFile(selectedFile);
      if (!validation.valid) {
        setUploadError(validation.error ?? "Arquivo inválido.");
        setStatus("error");
        return;
      }

      setFile(selectedFile);
      setUploadError(null);
      revokePreviewUrl();
      revokeWebpBlobUrl();
      setResult(null);
      setSecureUrl(null);
      const previewUrl = URL.createObjectURL(selectedFile);
      setOriginalPreviewUrl(previewUrl);
      setStatus("loading");
      setProgress(0);

      try {
        if (!isConfigured) {
          throw new Error(
            "Cloudinary não configurado. Defina NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME e NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET no .env.local."
          );
        }
        const { secureUrl: url } = await uploadToCloudinary(
          selectedFile,
          (p) => setProgress(p)
        );
        setSecureUrl(url);
        const originalSize = selectedFile.size;
        const { webpBlobUrl, webpSize } = await applyConversion(url, quality);
        setResult({
          originalSize,
          webpSize,
          webpBlobUrl,
          reductionPercent: getReductionPercent(originalSize, webpSize),
        });
        setStatus("success");
      } catch (err) {
        setUploadError(err instanceof Error ? err.message : "Falha no upload.");
        setStatus("error");
      }
    },
    [
      isConfigured,
      quality,
      applyConversion,
      revokePreviewUrl,
      revokeWebpBlobUrl,
    ]
  );

  const onConvertAgain = useCallback(() => {
    revokePreviewUrl();
    revokeWebpBlobUrl();
    setFile(null);
    setOriginalPreviewUrl(null);
    setSecureUrl(null);
    setResult(null);
    setUploadError(null);
    setProgress(0);
    setStatus("idle");
  }, [revokePreviewUrl, revokeWebpBlobUrl]);

  const onQualityChange = useCallback(
    async (newQuality: number) => {
      setQuality(newQuality);
      if (!secureUrl || !result) return;
      setQualityLoading(true);
      try {
        const { webpBlobUrl, webpSize } = await applyConversion(secureUrl, newQuality);
        if (result.webpBlobUrl) URL.revokeObjectURL(result.webpBlobUrl);
        setResult((prev) =>
          prev
            ? {
                ...prev,
                webpBlobUrl,
                webpSize,
                reductionPercent: getReductionPercent(prev.originalSize, webpSize),
              }
            : null
        );
      } finally {
        setQualityLoading(false);
      }
    },
    [secureUrl, result, applyConversion]
  );

  useEffect(() => {
    return () => {
      revokePreviewUrl();
      revokeWebpBlobUrl();
    };
  }, [revokePreviewUrl, revokeWebpBlobUrl]);

  if (!isConfigured) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-800 dark:bg-amber-950/30">
        <p className="font-medium text-amber-800 dark:text-amber-200">
          Cloudinary não configurado
        </p>
        <p className="mt-2 text-sm text-amber-700 dark:text-amber-300">
          Crie um arquivo <code className="rounded bg-amber-200/50 px-1 dark:bg-amber-900/50">.env.local</code> na raiz do projeto com:
        </p>
        <pre className="mt-2 overflow-x-auto rounded-lg bg-neutral-100 p-3 text-xs dark:bg-neutral-800">
          {`NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=seu_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=seu_upload_preset_unsigned`}
        </pre>
        <p className="mt-2 text-sm text-amber-700 dark:text-amber-300">
          Veja o README para instruções de setup do Cloudinary.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <UploadDropzone
        status={status}
        originalPreviewUrl={originalPreviewUrl}
        progress={progress}
        error={uploadError}
        onFileSelect={onFileSelect}
      />

      {status === "success" && result && (
        <section className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-700 dark:bg-neutral-900/50">
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
            Resultado
          </h2>

          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                Original
              </p>
              <p className="mt-1 text-lg font-medium text-neutral-900 dark:text-white">
                {formatBytesShort(result.originalSize)}
              </p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                WebP
              </p>
              <p className="mt-1 text-lg font-medium text-neutral-900 dark:text-white">
                {formatBytesShort(result.webpSize)}
                {qualityLoading && (
                  <span className="ml-2 text-sm text-neutral-500">atualizando...</span>
                )}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              Redução
            </p>
            <p className="mt-1 text-2xl font-bold text-green-600 dark:text-green-400">
              {result.reductionPercent}%
            </p>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Qualidade WebP (30–95): {quality}
            </label>
            <input
              type="range"
              min={QUALITY_MIN}
              max={QUALITY_MAX}
              value={quality}
              onChange={(e) => onQualityChange(Number(e.target.value))}
              disabled={qualityLoading}
              className="mt-2 h-2 w-full max-w-xs cursor-pointer appearance-none rounded-full bg-neutral-200 dark:bg-neutral-600 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 [&::-webkit-slider-thumb]:dark:bg-blue-500"
            />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href={result.webpBlobUrl}
              download="converted.webp"
              className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              Baixar WebP
            </a>
            <button
              type="button"
              onClick={onConvertAgain}
              className="inline-flex items-center rounded-lg border border-neutral-300 bg-white px-4 py-2.5 text-sm font-medium text-neutral-700 hover:bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700"
            >
              Converter outra imagem
            </button>
          </div>

          <div className="mt-6">
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              Preview
            </p>
            <div className="mt-2 overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-600">
              <img
                src={result.webpBlobUrl}
                alt="Preview WebP"
                className="max-h-64 w-full object-contain"
              />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
