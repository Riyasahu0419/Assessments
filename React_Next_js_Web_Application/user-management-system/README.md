# User Management System

A full-stack web application built with Next.js, TypeScript, Prisma ORM, and Bootstrap for managing users with full CRUD functionality.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Bootstrap 5 + Custom CSS (Orange theme)
- **ORM:** Prisma
- **Database:** MySQL / PostgreSQL
- **Notifications:** react-hot-toast
- **State:** React Hooks

## Features

- View all users in a responsive table
- Add new users with form validation
- Edit existing users
- Delete users with confirmation
- Search users by name or email
- Filter users by role (Admin / User)
- Pagination (3 users per page)
- Toast notifications for all actions
- Loading states with Bootstrap spinner
- Role badges (Admin / User)
- Orange/Warm color theme throughout

## Project Structure

```
user-management-system/
├── app/
│   ├── add-user/
│   │   └── page.tsx          # Add user page
│   ├── edit/[id]/
│   │   └── page.tsx          # Edit user page
│   ├── api/users/
│   │   └── [id]/             # REST API routes (PUT, DELETE)
│   ├── globals.css           # Global styles + theme
│   ├── layout.tsx            # Root layout with navbar
│   └── page.tsx              # Dashboard with table, search, pagination
├── components/
│   ├── UserForm.tsx          # Reusable add/edit form
│   ├── UserTable.tsx         # Users table with actions
│   ├── Loader.tsx            # Loading spinner
│   └── EmptyState.tsx        # Empty state UI
├── hooks/
│   └── useUsers.ts           # Custom hook for user data
├── lib/
│   ├── dummyData.ts          # Seed dummy users
│   ├── userStore.ts          # In-memory store (frontend)
│   └── prisma.ts             # Prisma client instance
├── prisma/
│   └── schema.prisma         # Database schema
├── types/
│   └── user.ts               # User TypeScript interface
└── package.json
```

## Getting Started

### 1. Install dependencies

```bash
cd user-management-system
npm install
```

### 2. Configure environment

Create a `.env` file in the root of `user-management-system/`:

```env
DATABASE_URL="mysql://username:password@localhost:3306/user_management"
```

> For PostgreSQL use: `postgresql://username:password@localhost:5432/user_management`

### 3. Set up the database

```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

```prisma
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  role      String
  createdAt DateTime @default(now())
}
```

## API Routes

| Method | Endpoint          | Description       |
|--------|-------------------|-------------------|
| GET    | /api/users        | Fetch all users   |
| POST   | /api/users        | Create a new user |
| PUT    | /api/users/:id    | Update a user     |
| DELETE | /api/users/:id    | Delete a user     |

## Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run start     # Start production server
npm run lint      # Run ESLint
```

## Notes

- The frontend currently uses an in-memory store (`lib/userStore.ts`) with dummy data for UI development. To connect to a real database, replace the store calls in `hooks/useUsers.ts`, `UserForm.tsx`, and `UserTable.tsx` with the corresponding API route calls.
- Prisma client is initialized in `lib/prisma.ts` and ready to use in API routes once the database is configured.
