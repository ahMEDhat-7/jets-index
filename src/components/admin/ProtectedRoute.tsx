import { useAuthStore } from "../../store/useAuthStore";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[hsl(var(--background))]">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-[hsl(var(--foreground))] mb-2">
            Access Denied
          </h1>
          <p className="text-[hsl(var(--muted-foreground))] mb-4">
            Please log in to access this page.
          </p>
          <a
            href="/admin/login"
            className="inline-block px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-lg hover:opacity-90 transition-opacity"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
