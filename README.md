# Caio Tools

Plataforma de ferramentas online (Next.js + Tailwind). Fase 1 (bootstrap) e Fase 2 (Conversor WebP) concluídas.

## Como rodar

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto (não commitar).

### Obrigatório para o Conversor de Imagem (WebP)

| Variável | Descrição |
|----------|-----------|
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Nome do cloud no dashboard Cloudinary |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Upload preset **unsigned** (para upload direto do frontend) |

### Opcional

| Variável | Descrição |
|----------|-----------|
| `NEXT_PUBLIC_SITE_URL` | URL base do site (ex: `https://caiotools.com`) — usada em sitemap e metadata |

### Setup rápido Cloudinary

1. Crie uma conta em [cloudinary.com](https://cloudinary.com).
2. No dashboard, anote o **Cloud name**.
3. Em **Settings → Upload**, crie um **Upload preset**:
   - Signing Mode: **Unsigned** (permite upload direto do navegador).
4. Use o nome do preset em `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`.

Exemplo `.env.local`:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=meu_cloud
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=meu_preset_unsigned
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Scripts

- `npm run dev` — servidor de desenvolvimento
- `npm run build` — build de produção
- `npm run start` — servidor de produção (após `build`)
- `npm run lint` — ESLint
- `npm run format` — Prettier

## Estrutura

- `app/(site)/page.tsx` — Home (herói, grid de ferramentas, CTA)
- `app/tools/page.tsx` — Lista de ferramentas
- `app/tools/image-converter/` — Conversor PNG/JPG → WebP (upload, Cloudinary, download)
- `app/layout.tsx` — Layout global + Header + Footer
- `components/` — Header, Footer, ToolCard, **UploadDropzone** (reutilizável)
- `lib/` — tools.ts, cloudinary.ts, image-converter-constants.ts
- `utils/` — formatBytes.ts
- `services/` — reservado para uso futuro

## Ferramentas

### Conversor de Imagem para WebP

- Upload por drag & drop ou clique (PNG, JPG, WebP — até 5MB).
- Envio direto para Cloudinary; conversão via URL (`f_webp` + qualidade 30–95).
- Exibe tamanho original, tamanho WebP e % de redução; preview e download.

## SEO

- Metadata (title/description) por página
- OpenGraph básico
- `app/robots.ts` e `app/sitemap.ts` configurados

Defina `NEXT_PUBLIC_SITE_URL` no `.env.local` para produção.
