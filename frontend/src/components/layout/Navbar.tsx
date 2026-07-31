import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { MobileNav } from './MobileNav';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'Capabilities', path: '/capabilities' },
  { name: 'Sustainability', path: '/sustainability' },
  { name: 'Certifications', path: '/certifications' },
  { name: 'Get in Touch', path: '/contact' },
];

export function Navbar() {
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = pathname === '/';
  const isTransparent = isHome && !isScrolled;

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        isTransparent
          ? 'bg-transparent py-4'
          : 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2 border-b border-border shadow-soft'
      )}
    >
      <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className={cn("font-heading font-bold text-2xl tracking-tight transition-colors", isTransparent ? "text-white" : "text-foreground")}>
            AL-Amin Export ltd.
          </span>
        </Link>
        
        <nav className="hidden lg:flex items-center space-x-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-sm font-medium transition-colors hover:text-accent',
                isTransparent ? 'text-white/90 hover:text-white' : (pathname === link.path ? 'text-accent' : 'text-foreground/80')
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/login">
            <Button 
              variant="primary" 
              className={cn(
                "rounded-full px-8 uppercase tracking-widest text-xs font-bold transition-all",
                isTransparent 
                  ? "bg-transparent border border-white text-white hover:bg-white hover:text-black" 
                  : "bg-black text-white hover:bg-black/80"
              )}
            >
              LOGIN
            </Button>
          </Link>
        </nav>

        <div className="lg:hidden">
          <MobileNav links={NAV_LINKS} isTransparent={isTransparent} />
        </div>
      </div>
    </header>
  );
}
