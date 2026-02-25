# Caio Tools

Plataforma web de ferramentas online gratuitas: conversão de imagens para WebP, com foco em SEO, simplicidade e boa experiência no mobile.

---

## Estado atual do projeto

- **Stack:** Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- **Ferramentas disponíveis:** 1 (Conversor de Imagem para WebP)
- **Layout:** Header e Footer com logo; home com grid de ferramentas e CTA; lista em `/tools`
- **SEO:** metadata e OpenGraph por página, `robots.txt` e sitemap dinâmico
- **Deploy:** build estático/SSR padrão Next.js; variáveis de ambiente para Cloudinary e URL do site

---

## Como rodar

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

---

## Variáveis de ambiente

Crie um arquivo **`.env.local`** na raiz (não commitar). Use o **`.env.example`** como referência.

| Variável | Obrigatório | Descrição |
|----------|-------------|-----------|
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Sim (para Conversor WebP) | Nome do cloud no [Cloudinary](https://cloudinary.com) |
| `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` | Sim (para Conversor WebP) | Nome do upload preset **unsigned** |
| `NEXT_PUBLIC_SITE_URL` | Não | URL base do site (ex: `https://caiotools.com`) — sitemap e metadata |

### Cloudinary (resumo)

1. Conta em [cloudinary.com](https://cloudinary.com) → anotar **Cloud name**
2. **Settings → Upload → Upload presets** → criar preset com **Signing Mode: Unsigned**
3. Colocar nome do cloud e do preset no `.env.local`

---

## Scripts

| Comando | Uso |
|---------|-----|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run start` | Servidor de produção (após `build`) |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

---

## Estrutura do projeto

```
├── app/
│   ├── layout.tsx              # Layout global (Header + Footer + metadata)
│   ├── globals.css
│   ├── robots.ts                # Regras para crawlers
│   ├── sitemap.ts               # Sitemap dinâmico
│   ├── (site)/
│   │   └── page.tsx             # Home (herói, grid de ferramentas, CTA)
│   └── tools/
│       ├── page.tsx             # Lista de ferramentas
│       └── image-converter/
│           ├── page.tsx         # Página do conversor WebP
│           └── ImageConverterClient.tsx
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ToolCard.tsx             # Card de ferramenta (com imagem opcional)
│   └── UploadDropzone.tsx      # Drag & drop reutilizável
├── lib/
│   ├── tools.ts                 # Lista de ferramentas (slug, nome, descrição, href, image)
│   ├── cloudinary.ts            # Upload e URL transformada (WebP)
│   └── image-converter-constants.ts  # Limites e validação do conversor
├── utils/
│   └── formatBytes.ts
├── services/                    # Reservado
├── public/
│   ├── logo.png
│   └── (assets por ferramenta, ex.: conversorimagem.png)
├── .env.example
├── .env.local                  # Não commitar
└── package.json
```

---

## Ferramentas

### Conversor de Imagem para WebP (`/tools/image-converter`)

- **Entrada:** PNG, JPG ou WebP (até 5 MB), por drag & drop ou clique
- **Fluxo:** Upload direto para Cloudinary → transformação para WebP via URL (`f_webp` + qualidade 30–95)
- **Saída:** Preview, tamanho original vs convertido, % de redução, download em WebP e opção “Converter outra imagem”

Requer `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` e `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET` no `.env.local`.

---

## SEO

- **Metadata:** `title` e `description` por página
- **OpenGraph:** configurado no layout e nas páginas principais
- **robots.txt:** gerado em `app/robots.ts` (allow `/`, disallow `/api/`, link do sitemap)
- **Sitemap:** gerado em `app/sitemap.ts` a partir de `lib/tools.ts` e rotas fixas

Para produção, defina `NEXT_PUBLIC_SITE_URL` no `.env.local`.

---

## Licença

Projeto privado / uso pessoal e portfólio.
