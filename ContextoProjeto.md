# 🧠 Contexto do Projeto — Plataforma de Ferramentas Web

## 📌 Visão Geral

Este projeto é uma plataforma web que disponibiliza diversas ferramentas online úteis para usuários comuns, desenvolvedores e pequenos negócios.

O objetivo é:
- Gerar valor real para usuários
- Aumentar tráfego orgânico (SEO)
- Servir como portfólio profissional
- Converter visitantes em leads/clientes

---

## 🚀 Stack Tecnológica

### Frontend
- Next.js (App Router)
- React
- TailwindCSS
- Typescript

### Backend
- Node.js (quando necessário)
- API Routes do Next.js (preferencial para MVP)

### Upload e Processamento de Imagens
- Cloudinary (principal solução)
- Sharp (fallback ou processamento customizado no backend)

---

## 🧩 Arquitetura

### Princípio geral:
Priorizar simplicidade, performance e baixo custo.

### Fluxo padrão de ferramentas (ex: conversão de imagem)

1. Usuário acessa a ferramenta
2. Faz upload de um arquivo
3. O arquivo é enviado diretamente para o Cloudinary (sempre que possível)
4. A transformação é feita via URL (sem processamento pesado no backend)
5. O resultado é exibido na tela com opção de download

---

## 📁 Estrutura esperada do projeto
/app
/tools
/image-converter
page.tsx
components/
/components
/lib
/services
/utils


---

## 🛠️ Primeira ferramenta: Conversor de Imagem (PNG → WebP, JPG → WebP)

### Funcionalidades:
- Upload de imagem (drag and drop)
- Preview da imagem original
- Conversão para WebP
- Controle de qualidade (opcional)
- Exibição de:
  - tamanho original
  - tamanho convertido
  - % de redução
- Botão de download

---

## ⚙️ Regras de Implementação

### Upload
- Limite máximo: 5MB por arquivo
- Aceitar apenas:
  - image/png
  - image/jpeg
  - image/webp

### Segurança
- Validar tipo e tamanho do arquivo no frontend e backend
- Nunca confiar apenas no frontend

### Performance
- Evitar salvar arquivos desnecessariamente
- Preferir transformação via URL (Cloudinary)
- Evitar processamento síncrono pesado no backend

---

## ☁️ Cloudinary

### Uso esperado:
- Upload direto do frontend (quando possível)
- Transformações via URL:
  - formato: `f_webp`
  - qualidade: `q_auto` ou manual


---

## 🎨 UI/UX Guidelines

- Interface simples e moderna
- Mobile-first
- Feedback visual claro (loading, sucesso, erro)
- Drag & Drop funcional
- Mostrar comparação visual (antes/depois)
- Exibir métricas de otimização

---

## 📈 Estratégia de Produto

Cada ferramenta deve:
- Ter URL própria (SEO)
- Ter título e descrição otimizados
- Ter CTA (ex: "Precisa de um sistema profissional? Entre em contato")

---

## ❗ Regras IMPORTANTES para o Cursor

- NÃO adicionar complexidade desnecessária
- NÃO criar backend pesado se Cloudinary resolver
- SEMPRE priorizar soluções simples e funcionais
- EVITAR dependências desnecessárias
- SEGUIR a arquitetura definida neste documento
- NÃO inventar funcionalidades fora do escopo sem instrução explícita

---

## 🔮 Futuro do Projeto

Possíveis expansões:
- Sistema de contas (login)
- Histórico de uso
- Plano premium
- Mais ferramentas (IA, negócios, dev tools)

---

## 🧠 Filosofia

Este projeto deve ser:
- Simples de manter
- Rápido
- Escalável
- Focado em gerar valor real

---
