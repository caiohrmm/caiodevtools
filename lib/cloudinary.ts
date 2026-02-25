const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export function getCloudinaryConfig() {
  return {
    cloudName: CLOUD_NAME ?? "",
    uploadPreset: UPLOAD_PRESET ?? "",
    isConfigured: Boolean(CLOUD_NAME && UPLOAD_PRESET),
  };
}

/**
 * Upload file to Cloudinary using unsigned preset (client-side).
 */
export async function uploadToCloudinary(
  file: File,
  onProgress?: (percent: number) => void
): Promise<{ secureUrl: string; publicId: string }> {
  const { cloudName, uploadPreset, isConfigured } = getCloudinaryConfig();
  if (!isConfigured) {
    throw new Error("Cloudinary não configurado. Defina NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME e NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET.");
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable && onProgress) {
        onProgress(Math.round((e.loaded / e.total) * 100));
      }
    });

    xhr.addEventListener("load", () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);
          resolve({ secureUrl: data.secure_url, publicId: data.public_id });
        } catch {
          reject(new Error("Resposta inválida do servidor."));
        }
      } else {
        try {
          const err = JSON.parse(xhr.responseText);
          reject(new Error(err.error?.message ?? "Falha no upload."));
        } catch {
          reject(new Error(`Upload falhou (${xhr.status}).`));
        }
      }
    });

    xhr.addEventListener("error", () => reject(new Error("Erro de rede.")));
    xhr.addEventListener("abort", () => reject(new Error("Upload cancelado.")));

    xhr.open("POST", `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`);
    xhr.send(formData);
  });
}

/**
 * Build Cloudinary URL with WebP transform (f_webp + quality).
 * Inserts transformation segment after /upload/ in the original URL.
 */
export function getWebPTransformUrl(secureUrl: string, quality: number): string {
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloudName) return secureUrl;

  // URL format: https://res.cloudinary.com/cloud_name/image/upload/v123/public_id.ext
  const match = secureUrl.match(
    /^https:\/\/res\.cloudinary\.com\/[^/]+\/image\/upload\/(.+)$/
  );
  if (!match) return secureUrl;

  const afterUpload = match[1];
  const transform = `f_webp,q_${quality}`;
  return `https://res.cloudinary.com/${cloudName}/image/upload/${transform}/${afterUpload}`;
}
