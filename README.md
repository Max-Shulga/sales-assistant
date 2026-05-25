# CRM Lab

CRM-система для управления пользователями с real-time уведомлениями и автоматизацией через n8n.

## Стек

- **Next.js 16** (App Router) — фреймворк
- **React 19** — UI
- **Supabase** — база данных, аутентификация, SSR-сессии
- **n8n** — автоматизация и Telegram-уведомления
- **AG Grid** — таблица пользователей
- **React Hook Form + Zod** — формы и валидация
- **SCSS Modules** — стилизация
- **Sonner** — toast-уведомления
- **Husky + lint-staged** — pre-commit хуки

## Возможности

- 🔐 Аутентификация (логин / регистрация) через Supabase
- 👥 Таблица пользователей с AG Grid (сортировка, фильтрация)
- ✏️ Редактирование профиля пользователя
- 🌙 Тёмная / светлая тема без мигания (anti-flash)
- 🔔 Webhook-уведомления в Telegram через n8n

## Быстрый старт

### 1. Установка зависимостей

```bash
npm install
```

### 2. Переменные окружения

Скопируй `.env.example` в `.env.local` и заполни значения:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=      # URL проекта в Supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY= # Anon key из Supabase
N8N_WEBHOOK_URL=               # URL вебхука n8n
```

### 3. Запуск

```bash
npm run dev
```

Открой [http://localhost:3000](http://localhost:3000).

## Скрипты

| Команда            | Описание                 |
| ------------------ | ------------------------ |
| `npm run dev`      | Запуск dev-сервера       |
| `npm run build`    | Сборка для продакшена    |
| `npm run start`    | Запуск продакшен-сервера |
| `npm run lint`     | Проверка ESLint          |
| `npm run lint:fix` | Автоисправление ESLint   |
| `npm run format`   | Форматирование Prettier  |

## Структура проекта

```
src/
├── app/
│   ├── (private)/          # Защищённые маршруты (dashboard, users)
│   ├── (public)/           # Публичные маршруты (login, register)
│   └── layout.tsx          # Root layout
├── components/ui/          # UI-компоненты (Button, Input, Badge, ...)
├── contexts/               # React Context (ThemeContext)
├── actions/                # Server Actions (auth, user)
├── lib/
│   ├── supabase/           # Клиент, сервер, middleware
│   └── n8n/                # Отправка вебхуков
├── schemas/                # Zod-схемы валидации
└── styles/                 # Глобальные SCSS (темы, переменные, миксины)
```

## Архитектура уведомлений

```
Server Action → n8n Webhook → Telegram Bot
```

Server Actions выполняют мутации (логин, обновление пользователя), отправляют событие на вебхук n8n, n8n обрабатывает событие и шлёт уведомление в Telegram.
