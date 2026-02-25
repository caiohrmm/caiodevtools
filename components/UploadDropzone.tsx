"use client";

import { useCallback, useState } from "react";
import { validateFile } from "@/lib/image-converter-constants";

export type DropzoneStatus = "idle" | "loading" | "success" | "error";

type Props = {
  status: DropzoneStatus;
  originalPreviewUrl?: string | null;
  progress?: number;
  error?: string | null;
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSizeMb?: number;
};

export function UploadDropzone({
  status,
  originalPreviewUrl,
  progress = 0,
  error: parentError,
  onFileSelect,
  accept = "image/png,image/jpeg,image/webp",
  maxSizeMb = 5,
}: Props) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleFile = useCallback(
    (file: File | null) => {
      if (!file) return;
      setValidationError(null);
      const result = validateFile(file);
      if (!result.valid) {
        setValidationError(result.error ?? "Arquivo inválido.");
        return;
      }
      onFileSelect(file);
    },
    [onFileSelect]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files?.[0];
      handleFile(file ?? null);
    },
    [handleFile]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      handleFile(file ?? null);
      e.target.value = "";
    },
    [handleFile]
  );

  const showInput = status === "idle" || status === "error";
  const error = parentError ?? validationError;
  const showError = Boolean(error);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`
        relative rounded-xl border-2 border-dashed transition
        ${isDragOver && showInput ? "border-blue-500 bg-blue-50/50 dark:bg-blue-950/20" : ""}
        ${showError ? "border-red-300 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20" : ""}
        ${status === "loading" ? "border-neutral-300 bg-neutral-50 dark:border-neutral-600 dark:bg-neutral-900/30" : ""}
        ${status === "idle" && !showError ? "border-neutral-300 bg-neutral-50/50 dark:border-neutral-700 dark:bg-neutral-900/30" : ""}
      `}
    >
      <input
        type="file"
        accept={accept}
        onChange={handleChange}
        disabled={!showInput}
        className="absolute inset-0 z-10 cursor-pointer opacity-0"
        aria-label="Selecionar imagem"
      />

      {status === "loading" && (
        <div className="p-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
            {originalPreviewUrl && (
              <div className="flex-shrink-0 overflow-hidden rounded-lg border border-neutral-200 dark:border-neutral-600">
                <img
                  src={originalPreviewUrl}
                  alt="Preview"
                  className="h-24 w-24 object-cover sm:h-28 sm:w-28"
                />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Enviando e convertendo...
              </p>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-neutral-200 dark:bg-neutral-700">
                <div
                  className="h-full bg-blue-600 transition-all duration-300 dark:bg-blue-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                {progress}%
              </p>
            </div>
          </div>
        </div>
      )}

      {showError && (
        <div className="p-6">
          <p className="text-center text-sm font-medium text-red-700 dark:text-red-400">
            {error}
          </p>
          <p className="mt-2 text-center text-xs text-neutral-600 dark:text-neutral-400">
            Arraste outra imagem ou clique para tentar novamente.
          </p>
          {originalPreviewUrl && (
            <div className="mx-auto mt-4 flex justify-center">
              <img
                src={originalPreviewUrl}
                alt="Preview"
                className="h-20 w-20 rounded-lg border border-neutral-200 object-cover dark:border-neutral-600"
              />
            </div>
          )}
        </div>
      )}

      {status === "idle" && !validationError && (
        <div className="p-8 text-center sm:p-10">
          <p className="text-neutral-600 dark:text-neutral-400">
            Arraste uma imagem aqui ou{" "}
            <span className="font-medium text-blue-600 dark:text-blue-400">
              clique para escolher
            </span>
          </p>
          <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-500">
            PNG, JPG ou WebP — até {maxSizeMb}MB
          </p>
        </div>
      )}
    </div>
  );
}
