import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, LogIn } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin-login")({
  component: AdminLoginPage,
  head: () => ({
    meta: [
      { title: "Admin Login — GSHRM Payroll" },
      { name: "description", content: "Admin login for GSHRM Payroll dashboard." },
    ],
  }),
});

function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const ADMIN_USERNAME = "greatsupport";
  const ADMIN_PASSWORD = "greatsupport123@";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        // Store auth token in localStorage
        localStorage.setItem("adminToken", "authenticated");
        localStorage.setItem("adminUsername", username);
        toast.success("Login successful!");
        // Redirect to admin dashboard
        router.navigate({ to: "/admin" });
      } else {
        toast.error("Invalid username or password");
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-primary/5 via-background to-primary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 mb-4">
            <Lock className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Admin Portal</h1>
          <p className="text-muted-foreground mt-2">GSHRM Payroll Management System</p>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleLogin}
          className="bg-white rounded-2xl shadow-lg border border-border p-8"
        >
          <div className="space-y-4">
            {/* Username */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-semibold text-foreground mb-2"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                disabled={isLoading}
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-foreground mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !username || !password}
            className="w-full mt-6 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-white font-semibold py-2.5 rounded-lg transition duration-200 flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-sm text-muted-foreground mt-6">Secure admin access only</p>
      </div>
    </div>
  );
}
