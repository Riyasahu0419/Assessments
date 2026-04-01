"use client";

import { useParams, useRouter } from "next/navigation";
import { userStore } from "@/lib/userStore";
import UserForm from "@/components/UserForm";

export default function EditUserPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id);
  const user = userStore.getById(id);

  if (!user) {
    return (
      <div className="text-center mt-5">
        <h5 className="text-danger">User not found</h5>
        <button className="btn btn-outline-orange mt-3" onClick={() => router.push("/")}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <>
      <h2 className="mb-4">Edit User</h2>
      <UserForm user={user} />
    </>
  );
}
