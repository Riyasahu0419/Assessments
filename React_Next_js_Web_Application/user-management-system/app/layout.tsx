import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "User Management System",
  description: "Manage your users",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-light">
        <nav className="navbar navbar-dark navbar-orange mb-4">
          <div className="container">
            <span className="navbar-brand fw-bold">User Management System</span>
          </div>
        </nav>
        <div className="container pb-5">
          {children}
        </div>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
