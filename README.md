# Bytes.io

**Where Code Meets Momentum.**

Bytes.io is a modern community platform for engineers — built with Next.js, Supabase, and Prisma. It provides project showcasing, event management, resource sharing, leaderboards, and mentorship features for developer communities.

---

## ✨ Features

### 🏠 Home
- Animated landing page with typewriter effect
- Live community stats (members, projects, power score)

### 🚀 Project Showcase
- Submit and browse community projects
- **Star rating system** (1–5 stars) from any logged-in user
- **Hall of Fame** — projects with avg rating ≥ 4.0 are auto-featured
- GitHub repo & live demo links

### 📅 Events
- Dynamic event listing from the database
- **Admin-only multi-step event creation form** (4 steps: Basic Info → Schedule & Location → Details → Review & Publish)
- Event status badges (upcoming, live, ended)

### 📚 Resource Library
- Community-driven resource sharing (any logged-in user)
- Title, description, URL, and category-based organization
- Search and category filtering (General, Frontend, Backend, DevOps, AI/ML, System Design, Career, DSA)

### 🏆 Leaderboard
- Real-time ranking by power score
- Seasonal leaderboard tracking
- GitHub and LeetCode contribution scoring

### 👥 Members
- Browse all registered community members
- Search by name, username, or tech stack

### 🧑‍🏫 Mentors
- Displays all **admin** profiles as mentors
- Shows tech stack, bio, and profile links

### 👤 Profiles
- Individual member profile pages
- Project portfolio, tech stack, and stats
- Role badge (admin/member)

### 🔐 Authentication
- GitHub OAuth via Supabase Auth
- Onboarding flow for new users

### 👑 Admin System
- Role-based access: `member` (default) and `admin`
- Admins can create/delete events
- Admins appear as Mentors
- Admin role set via database

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 16](https://nextjs.org/) (App Router + Turbopack) |
| Language | TypeScript |
| Database | PostgreSQL (via [Supabase](https://supabase.com/)) |
| ORM | [Prisma 7](https://www.prisma.io/) with `@prisma/adapter-pg` |
| Auth | Supabase Auth (GitHub OAuth) |
| Styling | Tailwind CSS |
| Animations | Framer Motion |
| Icons | Lucide React |

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** or **pnpm**
- A **Supabase** project ([create one free](https://supabase.com/))

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/bytes-io.git
cd bytes-io
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

You need **two** env files:

#### `.env` — Database Connection

```env
# Supabase Pooler URL (port 6543) — used by the app at runtime
DATABASE_URL=postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?schema=public&pgbouncer=true&statement_cache_size=0

# Supabase Direct URL (port 5432) — used by Prisma for schema operations
DIRECT_URL=postgresql://postgres.[PROJECT_REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres?schema=public
```

> **Finding these values:**
> Go to your Supabase project → **Settings** → **Database** → **Connection string**.
> - Use **"Transaction" mode** URL for `DATABASE_URL` (port 6543)
> - Use **"Session" mode** URL for `DIRECT_URL` (port 5432)

#### `.env.local` — Supabase Client Keys

```env
# Supabase project URL and anon key
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT_REF].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

> **Finding these values:**
> Go to your Supabase project → **Settings** → **API** → copy the **Project URL** and **anon/public** key.

### 4. Set Up GitHub OAuth (for login)

1. Create a GitHub OAuth App at [github.com/settings/developers](https://github.com/settings/developers)
2. Set the callback URL to:
   ```
   https://[PROJECT_REF].supabase.co/auth/v1/callback
   ```
3. In your Supabase dashboard, go to **Auth** → **Providers** → **GitHub** and paste your Client ID and Client Secret.

### 5. Push the Database Schema

```bash
npx prisma generate
npx prisma db push
```

> If you get a `prepared statement "s1" already exists` error, the `DIRECT_URL` is not configured. Prisma's schema engine cannot run through PgBouncer — it needs the direct connection on port 5432.

### 6. Run the Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## 👑 Setting Up an Admin

After signing in for the first time, your profile will have the default role `member`. To make yourself an admin, run this SQL in the Supabase **SQL Editor**:

```sql
UPDATE "Profile" SET role = 'admin' WHERE username = 'your-github-username';
```

Admin capabilities:
- Create and delete events
- Delete any resource
- Appear on the Mentors page

---

## 📁 Project Structure

```
src/
├── app/
│   ├── page.tsx                  # Home page
│   ├── login/page.tsx            # GitHub OAuth login
│   ├── onboarding/page.tsx       # New user onboarding
│   ├── hackathons/               # Events page
│   │   ├── page.tsx              # Server component (fetches data)
│   │   └── events-client.tsx     # Client component (UI + forms)
│   ├── resources/                # Resource library
│   │   ├── page.tsx
│   │   └── resources-client.tsx
│   ├── projects/                 # Project showcase + Hall of Fame
│   │   ├── page.tsx
│   │   └── projects-client.tsx
│   ├── mentorship/               # Mentors (admin profiles)
│   │   ├── page.tsx
│   │   └── mentors-client.tsx
│   ├── leaderboard/              # Power score rankings
│   ├── members/                  # Member directory
│   └── profile/[username]/       # Individual profiles
├── components/                   # Shared UI components
├── lib/
│   ├── prisma.ts                 # Prisma client singleton
│   └── actions/                  # Server actions
│       ├── events.ts             # Event CRUD (admin-only create/delete)
│       ├── resources.ts          # Resource CRUD
│       ├── projects.ts           # Project + rating logic
│       └── profile.ts            # Profile management
└── utils/supabase/               # Supabase client helpers
```

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (Turbopack) |
| `npm run build` | Create optimized production build |
| `npm run start` | Start production server |
| `npx prisma generate` | Regenerate Prisma client |
| `npx prisma db push` | Push schema changes to database |
| `npx prisma studio` | Open Prisma Studio (DB viewer) |

---

## 📄 License

MIT
