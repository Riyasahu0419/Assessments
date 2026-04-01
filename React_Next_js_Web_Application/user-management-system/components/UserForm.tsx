"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { User } from "@/types/user";
import { userStore } from "@/lib/userStore";

interface Props {
  user?: User | null;
}

export default function UserForm({ user }: Props) {
  const router = useRouter();

  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: (user?.role as "Admin" | "User") || "User",
  });

  const [errors, setErrors] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = { name: "", email: "" };
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Enter a valid email";
    setErrors(errs);
    return !errs.name && !errs.email;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      if (user) {
        userStore.update(user.id, form);
        toast.success("User updated successfully");
      } else {
        userStore.add(form);
        toast.success("User created successfully");
      }
      setLoading(false);
      router.push("/");
    }, 400);
  };

  return (
    <div className="card shadow-sm p-4" style={{ maxWidth: 500 }}>
      <form onSubmit={handleSubmit} noValidate>
        {/* Name */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Name</label>
          <input
            className={`form-control ${errors.name ? "is-invalid" : ""}`}
            placeholder="Enter full name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          {errors.name && <div className="invalid-feedback">{errors.name}</div>}
        </div>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label fw-semibold">Email</label>
          <input
            type="email"
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            placeholder="Enter email address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        {/* Role */}
        <div className="mb-4">
          <label className="form-label fw-semibold">Role</label>
          <select
            className="form-select"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value as "Admin" | "User" })}
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-orange" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Saving...
              </>
            ) : user ? "Update User" : "Create User"}
          </button>
          <button
            type="button"
            className="btn btn-outline-orange"
            onClick={() => router.push("/")}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
