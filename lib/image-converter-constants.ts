export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
export const MAX_FILE_SIZE_MB = 5;

export const ACCEPTED_MIMES = ["image/png", "image/jpeg", "image/webp"] as const;
export const ACCEPTED_EXTENSIONS = [".png", ".jpg", ".jpeg", ".webp"];

export function isAcceptedMime(type: string): boolean {
  return ACCEPTED_MIMES.includes(type as (typeof ACCEPTED_MIMES)[number]);
}

export function validateFile(file: File): { valid: boolean; error?: string } {
  if (!isAcceptedMime(file.type)) {
    return {
      valid: false,
      error: "Tipo de arquivo não permitido. Use PNG, JPG ou WebP.",
    };
  }
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `Arquivo muito grande. Máximo ${MAX_FILE_SIZE_MB}MB.`,
    };
  }
  return { valid: true };
}
