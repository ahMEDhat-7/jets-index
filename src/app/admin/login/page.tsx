"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";
import { login } from "@/lib/api";

export default function AdminLoginPage(): React.ReactNode {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login({ email, password });
      setAuth(result.access_token, result.user);
      router.push("/admin");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Login failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-tactical-bg px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="mb-8 text-center">
          <div className="font-tactical-display text-3xl font-bold text-tactical-accent">
            JETDEX
          </div>
          <div className="mt-2 text-sm text-tactical-text-secondary">
            Admin Panel
          </div>
        </div>

        {/* Login Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded border border-tactical-border bg-tactical-card p-8"
        >
          <h2 className="mb-6 font-tactical-display text-xl font-bold text-tactical-text">
            Sign In
          </h2>

          {error && (
            <div className="mb-4 rounded border border-tactical-alert/30 bg-tactical-alert/10 p-3 text-sm text-tactical-alert">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label className="mb-2 block text-sm text-tactical-text-secondary">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded border border-tactical-border bg-tactical-bg px-4 py-3 text-tactical-text placeholder-tactical-text-secondary/50 focus:border-tactical-accent focus:outline-none"
              placeholder="admin@jetsindex.com"
              required
            />
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-sm text-tactical-text-secondary">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border border-tactical-border bg-tactical-bg px-4 py-3 text-tactical-text placeholder-tactical-text-secondary/50 focus:border-tactical-accent focus:outline-none"
              placeholder="••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-tactical-accent py-3 font-tactical-display font-bold text-tactical-bg transition-all hover:bg-tactical-accent/90 disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-4 text-center text-sm text-tactical-text-secondary">
          <a href="/en" className="hover:text-tactical-accent">
            ← Back to Jetdex
          </a>
        </div>
      </div>
    </div>
  );
}
