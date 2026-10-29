# guestra.org

Маркетинговый сайт Guestra: PMS, CRM и AI-администратор для отелей. React 18, TypeScript, Vite, Tailwind, framer-motion. Деплой — Cloudflare Workers со статическими ассетами.

## Команды

```bash
npm install
npm run dev        # разработка, http://localhost:8080
npm run build      # клиентская сборка + SSR-сборка + пререндер всех страниц в dist/
npm test           # vitest: маршруты, форма заявки, Worker
npm run lint
npm run typecheck
node scripts/serve-dist.mjs   # проверить dist/ так, как его отдаёт Cloudflare
npm run og         # перегенерировать превью для соцсетей (нужен Python и Pillow)
```

## Как устроено

- `src/routes.tsx` — единый список страниц с заголовками и описаниями. Его используют роутер, метаданные, пререндер и sitemap. Новая страница добавляется только здесь.
- `src/data/` — содержание: `capabilities.ts` (карта возможностей со статусами), `moduleLinks.tsx` (связки модулей), `demo.ts` (демо-данные панелей), `faq.ts`, `updates.ts`, `navigation.ts`.
- `src/components/product/` — интерфейсные демо: шахматка, входящие CRM, AI-чат, ценообразование, кабинет собственника и др. Подписи и статусы повторяют реальные CRM и PMS Guestra.
- `src/components/home/` — секции главной, `src/components/page/PageBlocks.tsx` — общие блоки продуктовых страниц.
- `src/entry-server.tsx` и `scripts/prerender.mjs` — пререндер. Каждая страница собирается в `dist/<route>.html` со своими title, description, OG-превью и JSON-LD; неизвестные адреса получают `dist/404.html` с кодом 404.
- `worker/` — Cloudflare Worker. Обрабатывает только `/api/*`, остальное отдаёт статика.

## Статусы функций

Функции в разработке отмечаются полем `status: "soon"` в `src/data/capabilities.ts` и компонентом `StatusBadge`. Когда функция выходит, достаточно убрать статус и добавить запись в `src/data/updates.ts`.

## Заявки с сайта

Все формы отправляют `POST /api/lead`. Worker проверяет поля, отсекает спам (скрытое поле и слишком быстрая отправка) и отправляет письмо на `LEAD_TO` (по умолчанию `sales@guestra.org`). Если отправка не удалась, форма показывает ошибку и адрес почты.

Нужна одна из настроек:

1. **Cloudflare Email Routing** (по умолчанию). В зоне guestra.org включить Email Routing, подтвердить адрес назначения для `LEAD_TO` и разрешить отправку с `LEAD_FROM` (`noreply@guestra.org`). Binding `SEND_EMAIL` уже описан в `wrangler.toml`.
2. **Resend.** `wrangler secret put RESEND_API_KEY` — при наличии ключа письма уходят через Resend, домен отправителя должен быть подтверждён там.

## Деплой

```bash
npm run build
npx wrangler deploy
```

`wrangler.toml` отдаёт `dist/` как статику (`html_handling = "auto-trailing-slash"`, `not_found_handling = "404-page"`) и запускает Worker только для `/api/*`.
