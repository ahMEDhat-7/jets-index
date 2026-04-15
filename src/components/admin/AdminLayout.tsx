import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import {
  LayoutDashboard,
  FileText,
  Plane,
  Folder,
  Globe,
  Factory,
  LogOut,
  Menu,
  X,
  ChevronLeft,
} from 'lucide-react';

const navItems = [
  { path: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/admin/blogs', label: 'Blogs', icon: FileText },
  { path: '/admin/platforms', label: 'Platforms', icon: Plane },
  { path: '/admin/categories', label: 'Categories', icon: Folder },
  { path: '/admin/countries', label: 'Countries', icon: Globe },
  { path: '/admin/manufacturers', label: 'Manufacturers', icon: Factory },
];

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

export default function AdminLayout({ children, title }: AdminLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen flex bg-[hsl(var(--background))]">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 flex flex-col bg-[hsl(var(--card))] border-r border-[hsl(var(--border))] transition-all duration-300 ${
          sidebarOpen ? 'w-64' : 'w-0 lg:w-16'
        } overflow-hidden`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-[hsl(var(--border))]">
          <Link
            to="/admin"
            className={`font-semibold text-[hsl(var(--card-foreground))] whitespace-nowrap ${
              sidebarOpen ? 'block' : 'hidden lg:block'
            }`}
          >
            Jets Index Admin
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded hover:bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))] lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-2 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path ||
              (item.path !== '/admin' && location.pathname.startsWith(item.path));
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))]'
                    : 'text-[hsl(var(--card-foreground))] hover:bg-[hsl(var(--muted))]'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className={`whitespace-nowrap ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-2 border-t border-[hsl(var(--border))]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-[hsl(var(--card-foreground))] hover:bg-[hsl(var(--muted))] transition-colors"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className={`whitespace-nowrap ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
              Logout
            </span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="flex items-center gap-4 p-4 bg-[hsl(var(--card))] border-b border-[hsl(var(--border))]">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded hover:bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]"
          >
            {sidebarOpen ? (
              <ChevronLeft className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
          <h1 className="text-lg font-semibold text-[hsl(var(--card-foreground))]">{title}</h1>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}