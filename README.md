# CRM Lab

Pet project CRM built with Next.js, Supabase and n8n.

## Overview

CRM Lab is a simple customer management system demonstrating modern fullstack architecture with event-driven integrations.

The project focuses on combining server actions, real-time updates and external automation workflows.

## Features

- Authentication (Supabase Auth)
- Users management (create/update)
- Realtime users table (Supabase subscriptions)
- Form handling with React Hook Form + Zod
- Server Actions for mutations
- Event-driven notifications via n8n:
  - User login events
  - User update events
- Telegram bot integration

## Demo

Telegram bot: https://t.me/crm_lab_notifications_bot

A test account is available upon request.

## Tech Stack

- **Frontend:** Next.js, TypeScript
- **Forms & Validation:** React Hook Form, Zod
- **Backend:** Next.js Server Actions
- **Database & Auth:** Supabase
- **Automation:** n8n
- **Notifications:** Telegram Bot API

## Architecture

The project uses an event-driven approach for external integrations:

- Server Actions handle mutations (login, update user)
- Events are sent to n8n via webhook
- n8n processes events and sends notifications to Telegram

## Getting Started

1. Clone the repository

2. Install dependencies

```bash
npm install
```

3. Create .env.local file in the root and add:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
N8N_WEBHOOK_URL=your_n8n_webhook_url
```

4. Run the development server

```bash
npm run dev
```

5. Open in browser:

```bash
http://localhost:3000
```
