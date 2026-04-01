"use client";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { User } from "@/types/user";
import { userStore } from "@/lib/userStore";

interface Props {
  users: User[];
  refresh: () => void;
}

export default function UserTable({ users, refresh }: Props) {
  const router = useRouter();

  const handleDelete = (id: number, name: string) => {
    if (!confirm(`Delete user "${name}"?`)) return;
    userStore.delete(id);
    toast.success(`${name} deleted successfully`);
    refresh();
  };

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-hover align-middle">
        <thead className="table-orange">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr key={user.id}>
              <td>{idx + 1}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>
                <span
                  className={`badge ${user.role === "Admin" ? "badge-admin" : "badge-user"}`}
                >
                  {user.role}
                </span>
              </td>
              <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              <td>
                <button
                  className="btn btn-sm btn-outline-orange me-2"
                  onClick={() => router.push(`/edit/${user.id}`)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(user.id, user.name)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
