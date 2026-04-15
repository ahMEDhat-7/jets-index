import { Plane, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[hsl(var(--card))] text-[hsl(var(--muted-foreground))] py-8 border-t border-[hsl(var(--border))] shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[hsl(var(--primary))] flex items-center justify-center shadow-sm">
              <Plane className="w-5 h-5 text-[hsl(var(--primary-foreground))]" />
            </div>
            <div>
              <span className="text-lg font-semibold text-[hsl(var(--card-foreground))] block">Jets Index</span>
              <span className="text-xs text-[hsl(var(--muted-foreground))] block">Military Platforms Database</span>
            </div>
          </div>
          
          <a 
            href="https://github.com/ahMEDhat-7" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[hsl(var(--primary))] hover:opacity-90 text-[hsl(var(--primary-foreground))] text-sm transition-colors shadow-sm hover:shadow-md"
          >
            <Github className="w-4 h-4" />
            <span>View on GitHub</span>
          </a>
        </div>

        <div className="mt-6 pt-6 border-t border-[hsl(var(--border))] flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[hsl(var(--muted-foreground))]">© {new Date().getFullYear()} Jets Index. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="text-xs text-[hsl(var(--muted-foreground))] font-medium">
              Built for aviation enthusiasts
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}