import { Link } from 'react-router-dom';
import AdminLayout from '../../components/admin/AdminLayout';
import { FileText, Plane, Folder, Globe, Factory, Plus, ArrowRight } from 'lucide-react';

const entityCards = [
  {
    path: '/admin/blogs',
    label: 'Blogs',
    description: 'Manage news articles and blog posts',
    icon: FileText,
    color: 'bg-blue-500',
  },
  {
    path: '/admin/platforms',
    label: 'Platforms',
    description: 'Manage military aircraft and vehicle data',
    icon: Plane,
    color: 'bg-green-500',
  },
  {
    path: '/admin/categories',
    label: 'Categories',
    description: 'Manage aircraft categories',
    icon: Folder,
    color: 'bg-purple-500',
  },
  {
    path: '/admin/countries',
    label: 'Countries',
    description: 'Manage country data',
    icon: Globe,
    color: 'bg-yellow-500',
  },
  {
    path: '/admin/manufacturers',
    label: 'Manufacturers',
    description: 'Manage manufacturer data',
    icon: Factory,
    color: 'bg-red-500',
  },
];

export default function DashboardPage() {
  return (
    <AdminLayout title="Dashboard">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-[hsl(var(--foreground))]">Welcome to Jets Index Admin</h2>
        <p className="text-[hsl(var(--muted-foreground))]">Manage your content from one place</p>
      </div>

      {/* Quick actions */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-[hsl(var(--muted-foreground))] mb-3">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <a
            href="/admin/blogs"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-lg hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            New Blog Post
          </a>
          <a
            href="/admin/platforms"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] rounded-lg hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            New Platform
          </a>
        </div>
      </div>

      {/* Entity cards */}
      <div>
        <h3 className="text-sm font-medium text-[hsl(var(--muted-foreground))] mb-3">Manage Entities</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {entityCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.path}
                to={card.path}
                className="flex items-start gap-4 p-4 bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))] hover:shadow-md transition-shadow"
              >
                <div className={`p-3 rounded-lg ${card.color}`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-[hsl(var(--card-foreground))]">{card.label}</h4>
                  <p className="text-sm text-[hsl(var(--muted-foreground))] line-clamp-2 mt-1">
                    {card.description}
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-[hsl(var(--muted-foreground))] flex-shrink-0" />
              </Link>
            );
          })}
        </div>
      </div>
    </AdminLayout>
  );
}