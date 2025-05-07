# 📰 FlashFeed

**FlashFeed** is a modern, full-stack news aggregator web application built with **Next.js (App Router)**, **TypeScript**, **TailwindCSS**, **Prisma ORM**, **Supabase (PostgreSQL)**, and **Clerk** for authentication.

It curates and categorizes news articles from both **RSS feeds** and **NewsAPI**, storing them in a central Postgres database and delivering them to users in a responsive, efficient interface.

---

## 📦 Tech Stack

- **Framework**: [Next.js 14+ (App Router)](https://nextjs.org/docs/app)
- **Language**: TypeScript
- **Styling**: TailwindCSS + ShadCN UI
- **Auth**: [Clerk.dev](https://clerk.dev/)
- **ORM**: Prisma ORM
- **Database**: Supabase (PostgreSQL)
- **Hosting**: Vercel (recommended)
- **Data Sources**: RSS Feeds + NewsAPI

---

## 🧠 Core Features

- ✅ Aggregates news from RSS + NewsAPI sources
- 🔄 Automatically fetches and stores articles via cron job
- ⚡️ Instant load using pre-fetched content from Supabase
- 🔍 Topic, Country & Search-based news categorization
- 🔐 Secure user authentication via Clerk
- 🧠 Basic recommendation engine (tag-based)
- 📱 Fully responsive design (Mobile-first)

---

## 📁 Project Structure Overview

```

flashfeed/
├── .github/workflows/         # GitHub Actions (Cron Job)
├── docs/                      # Developer guides
├── prisma/                    # Prisma schema
├── public/                    # Static assets
├── src/
│   ├── app/                   # App router structure
│   ├── components/            # UI & layout components
│   ├── hooks/                 # Custom hooks
│   ├── lib/                   # Core logic (API, utils)
│   ├── middleware.ts          # Middleware logic
│   ├── pages/api/cron/        # Fetch feed API route
│   ├── scripts/               # Cron fetch logic
│   ├── services/              # Business logic
│   ├── types/                 # TypeScript type defs
├── .env                       # Environment variables
├── next.config.ts             # Next.js config

````

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Mrinal-Ghosh/flashfeed.git
cd flashfeed
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Setup environment variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=your_supabase_postgres_transaction_pooler_url
DIRECT_URL=your_supabase_postgres_session_pooler_url
CRON_SECRET=your_cron_secret_key
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEWS_API_KEY=your_newsapi_key
```

### 4. Set up the database

```bash
npx prisma generate
npx prisma migrate dev --name init
```

### 5. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

---

## 🔄 Data Flow & Cron Workflow

* A GitHub Actions **cron job** (defined in `.github/workflows/fetch.yml`) triggers periodically.
* It calls the `/api/cron/fetch-feeds` API route.
* This route:

  * Pulls articles from **RSS feeds** and **NewsAPI**
  * Categorizes & tags them
  * Upserts them into **Supabase** via **Prisma ORM**
* On frontend page load, articles are fetched **directly from Supabase** (no client-side API fetch).

---

## 👤 Authentication

This app uses [Clerk](https://clerk.dev) for handling:

* Secure Sign In / Sign Up
* Session management
* Profile pages

> Pages under `/app/(auth)` handle login/signup logic.

---

## ✨ UI Structure

* Reusable components in `src/components/common` & `src/components/ui`
* Shared layouts in `src/components/layout`

---

## 🛠 Available Scripts

```bash
npm run dev             # Run dev server
npm run build           # Create production build
npm run lint            # Run ESLint
npm run format          # Format code using Prettier
```

---

## 📣 Contributing

We welcome contributions! Please follow the guidelines:

### 📚 Docs

See:

* `docs/BRANCH_NAMING_GUIDELINES.md`
* `docs/COMMIT_GUIDELINES.md`

### 🧪 Steps

1. Fork the repository
2. Create a new branch: `feat/your-feature-name`
3. Commit changes with conventional commits
4. Push to your fork and create a PR

---

## 🧪 Testing the Cron Locally

You can simulate the cron job locally by running:

```bash
ts-node src/scripts/fetch-feeds.ts
```

Or by hitting the API directly:

```
GET /api/cron/fetch-feeds
```

---

## 🧩 Future Improvements (Planned)

* 🔔 User preferences & push notifications
* 🧠 Smarter recommendations (based on reading behavior)
* 🌍 Language filters & internationalization
* 🗞️ Source-based filtering

---

## 📝 License

This project is open-source under the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

* [Next.js](https://nextjs.org/)
* [Supabase](https://supabase.io/)
* [Clerk](https://clerk.dev/)
* [NewsAPI](https://newsapi.org/)
* RSS Feeds from various open sources

```

---

