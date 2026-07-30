# Kit Emprego Bélgica 2026

Landing page de venda do produto digital Kit Emprego Bélgica 2026.

## Tecnologias

- React
- TypeScript
- TanStack Router
- Vite
- Tailwind CSS

## Desenvolvimento

```bash
npm install
npm run dev
```

## Verificação

```bash
npm run check
```

## Imagens

As imagens ficam em `public/image/`:

- hero-belgica.webp
- capa-kit-emprego-belgica.webp
- mockup-kit-emprego-belgica.webp

## Configuração

- O preço e o checkout ficam em `src/config/siteConfig.ts`.
- Os dados legais ficam em `src/config/legalConfig.ts`.
- A URL pública deve ser configurada em `VITE_SITE_URL` (ver `.env.example`).
- Nenhuma chave secreta deve ser adicionada em variáveis `VITE_*`.

## Entrega automática após pagamento

1. A Stripe envia o webhook para `POST /api/stripe/webhook`.
2. O servidor valida a assinatura (HMAC SHA-256) e confere modo, status, Payment Link, valor e moeda do pagamento.
3. O PDF é obtido do Vercel Blob privado.
4. A Brevo envia o PDF por e-mail como anexo, com chave de idempotência derivada do `session.id`.
5. Um marcador privado em `fulfillments/{session.id}.json` impede entregas duplicadas.

Variáveis de ambiente necessárias (somente backend, valores nunca no código):

- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PAYMENT_LINK_ID`
- `BREVO_API_KEY`
- `BREVO_SENDER_NAME`
- `BREVO_SENDER_EMAIL`
