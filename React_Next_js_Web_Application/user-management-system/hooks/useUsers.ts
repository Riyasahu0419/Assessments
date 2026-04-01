"use client";

import { useEffect, useState } from "react";
import { User } from "@/types/user";
import { userStore } from "@/lib/userStore";

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = () => {
    setLoading(true);
    // Simulate async fetch
    setTimeout(() => {
      setUsers(userStore.getAll());
      setLoading(false);
    }, 400);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, refresh: fetchUsers };
};
