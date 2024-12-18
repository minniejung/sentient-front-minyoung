This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Structure

```bash
src
├── app
│   ├── discover
│   │   └── page.tsx
│   ├── history
│   │   ├── page.tsx (history list page)
│   │   └── [id]
│   │       └── page.tsx (single chat history page)
│   ├── profile
│   │   └── page.tsx
│   ├── layout.tsx
│   └── page.tsx (landing page)
├── assets
├── components (common components)
├── features
│   ├── chat (chat page related components)
│   └── history (history page related components)
├── store (atom files)
├── utils
│   ├── helpers (helper files)
│   ├── styles (style files)
│   ├── db.ts (idb)
│   └── dummyQna.tsx (hard-coded QnA)
```

## Deployed on Vercel

https://
