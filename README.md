# Caio Tools

Plataforma de ferramentas online (Next.js + Tailwind). Fase 1: bootstrap concluído.

## Como rodar

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000).

## Scripts

- `npm run dev` — servidor de desenvolvimento
- `npm run build` — build de produção
- `npm run start` — servidor de produção (após `build`)
- `npm run lint` — ESLint
- `npm run format` — Prettier

## Estrutura (Fase 1)

- `app/(site)/page.tsx` — Home (herói, grid de ferramentas, CTA)
- `app/tools/page.tsx` — Lista de ferramentas
- `app/tools/image-converter/page.tsx` — Placeholder (Fase 2)
- `app/layout.tsx` — Layout global + Header + Footer
- `components/` — Header, Footer, ToolCard
- `lib/tools.ts` — Lista de ferramentas (slug, nome, descrição, href)
- `services/`, `utils/` — Reservados para uso futuro

## SEO

- Metadata (title/description) por página
- OpenGraph básico
- `app/robots.ts` e `app/sitemap.ts` configurados

Defina `NEXT_PUBLIC_SITE_URL` no `.env.local` para produção (ex: `https://caiotools.com`).
