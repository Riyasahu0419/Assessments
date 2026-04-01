"use client";

import { User } from "@/types/user";
import { dummyUsers } from "./dummyData";

// Simple in-memory store using a module-level variable
let users: User[] = [...dummyUsers];
let nextId = users.length + 1;

export const userStore = {
  getAll: (): User[] => [...users],

  getById: (id: number): User | undefined => users.find((u) => u.id === id),

  add: (data: Omit<User, "id" | "createdAt">): User => {
    const newUser: User = {
      id: nextId++,
      ...data,
      createdAt: new Date().toISOString(),
    };
    users = [...users, newUser];
    return newUser;
  },

  update: (id: number, data: Partial<Omit<User, "id" | "createdAt">>): User | null => {
    const idx = users.findIndex((u) => u.id === id);
    if (idx === -1) return null;
    users = users.map((u) => (u.id === id ? { ...u, ...data } : u));
    return users.find((u) => u.id === id)!;
  },

  delete: (id: number): boolean => {
    const before = users.length;
    users = users.filter((u) => u.id !== id);
    return users.length < before;
  },
};
