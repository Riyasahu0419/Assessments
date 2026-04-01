import UserForm from "@/components/UserForm";
import Link from "next/link";

export default function AddUserPage() {
  return (
    <>
      <div className="d-flex align-items-center gap-3 mb-4">
        <Link href="/" className="btn btn-outline-orange btn-sm">
          ← Back
        </Link>
        <h2 className="mb-0">Add User</h2>
      </div>
      <UserForm />
    </>
  );
}
