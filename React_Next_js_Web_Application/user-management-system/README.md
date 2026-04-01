# User Management System

Live Demo: [https://assessments-f5bz.vercel.app](https://assessments-f5bz.vercel.app)

A full-stack web app built with Next.js, Prisma ORM, and Bootstrap.

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Bootstrap 5 + React Bootstrap
- Prisma ORM (MySQL/PostgreSQL)
- react-hot-toast

## Features

- View all users in a table
- Add, edit, and delete users
- Search by name or email
- Filter by role (Admin / User)
- Pagination
- Toast notifications
- Form validation
- Responsive layout

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Database Setup

1. Configure your database URL in `.env`:

```env
DATABASE_URL="mysql://user:password@localhost:3306/userdb"
```

2. Run migrations:

```bash
npx prisma migrate dev --name init
npx prisma generate
```

## Prisma Schema

```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  role      String
  createdAt DateTime @default(now())
}
```

## Project Structure

```
app/
  page.tsx          # Dashboard
  add-user/         # Add user page
  edit/[id]/        # Edit user page
  api/users/        # REST API routes
components/
  UserTable.tsx
  UserForm.tsx
  Loader.tsx
  EmptyState.tsx
hooks/
  useUsers.ts
lib/
  userStore.ts      # In-memory store (dummy data)
  dummyData.ts
types/
  user.ts
```
