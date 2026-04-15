import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { Plane, Menu, X, Globe, Sun, Moon, ChevronDown } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const translations = {
  en: { browse: 'Browse', news: 'News' },
  ar: { browse: 'تصفح', news: 'الأخبار' }
};

export default function Header() {
  const { lang } = useParams();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const currentLang = lang || 'en';

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { href: `/${currentLang}/browse`, label: translations[currentLang as keyof typeof translations].browse },
    { href: `/${currentLang}/blog`, label: translations[currentLang as keyof typeof translations].news },
  ];

  const switchLang = (newLang: string) => {
    const currentPath = window.location.pathname;
    const newPath = currentPath.replace(`/${currentLang}`, `/${newLang}`);
    navigate(newPath || `/${newLang}`);
    setIsLangOpen(false);
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-[hsl(var(--card))] border-b border-[hsl(var(--border))] shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to={`/${currentLang}`} className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-lg bg-[hsl(var(--primary))] flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <Plane className="w-5 h-5 text-[hsl(var(--primary-foreground))]" />
            </div>
            <span className="text-lg font-semibold text-[hsl(var(--card-foreground))] group-hover:opacity-80 transition-opacity">Jets Index</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                to={item.href} 
                className="px-4 py-2 text-sm font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2" ref={dropdownRef}>
            {/* Language Switcher */}
            <div className="relative">
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)} 
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-[hsl(var(--muted))] text-sm text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="uppercase font-medium">{currentLang}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {isLangOpen && (
                <div className="absolute end-0 mt-2 w-32 bg-[hsl(var(--card))] rounded-lg shadow-lg border border-[hsl(var(--border))] z-50 overflow-hidden">
                  <button 
                    onClick={() => switchLang('en')} 
                    className={`w-full px-4 py-2.5 text-start text-sm hover:bg-[hsl(var(--muted))] flex items-center justify-between transition-colors ${
                      currentLang === 'en' ? 'text-[hsl(var(--foreground))] font-medium' : 'text-[hsl(var(--muted-foreground))]'
                    }`}
                  >
                    English
                    {currentLang === 'en' && <span className="w-2 h-2 rounded-full bg-[hsl(var(--primary))]" />}
                  </button>
                  <button 
                    onClick={() => switchLang('ar')} 
                    className={`w-full px-4 py-2.5 text-start text-sm hover:bg-[hsl(var(--muted))] flex items-center justify-between transition-colors ${
                      currentLang === 'ar' ? 'text-[hsl(var(--foreground))] font-medium' : 'text-[hsl(var(--muted-foreground))]'
                    }`}
                  >
                    العربية
                    {currentLang === 'ar' && <span className="w-2 h-2 rounded-full bg-[hsl(var(--primary))]" />}
                  </button>
                </div>
              )}
            </div>
            
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-lg hover:bg-[hsl(var(--muted))] transition-colors"
            >
              {theme === 'light' ? (
                <Moon className="w-4 h-4 text-[hsl(var(--muted-foreground))]" />
              ) : (
                <Sun className="w-4 h-4 text-[hsl(var(--primary))]" />
              )}
            </button>
            
            {/* Mobile Menu */}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="md:hidden p-2 rounded-lg hover:bg-[hsl(var(--muted))] transition-colors"
            >
              {isOpen ? <X className="w-4 h-4 text-[hsl(var(--foreground))]" /> : <Menu className="w-4 h-4 text-[hsl(var(--foreground))]" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <nav className="md:hidden py-4 border-t border-[hsl(var(--border))] space-y-1">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                to={item.href} 
                onClick={() => setIsOpen(false)} 
                className="block py-2.5 px-3 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] rounded-lg transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}