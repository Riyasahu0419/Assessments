# User Management System

Live Demo: [https://assessments-f5bz.vercel.app](https://assessments-f5bz.vercel.app)

A frontend web app built with Next.js and Bootstrap using in-memory dummy data.

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Bootstrap 5 + React Bootstrap
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

## Project Structure

```
app/
  page.tsx          # Dashboard
  add-user/         # Add user page
  edit/[id]/        # Edit user page
components/
  UserTable.tsx
  UserForm.tsx
  Loader.tsx
  EmptyState.tsx
hooks/
  useUsers.ts
lib/
  userStore.ts      # In-memory store
  dummyData.ts      # Dummy users
types/
  user.ts
```
