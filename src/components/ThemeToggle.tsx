import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-lg hover:bg-[hsl(var(--muted))] transition-colors"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? (
        <Moon className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
      ) : (
        <Sun className="w-4 h-4 text-[hsl(var(--primary))]" />
      )}
    </button>
  );
}