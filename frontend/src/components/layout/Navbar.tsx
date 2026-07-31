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
  { name: 'Contact', path: '/contact' },
];

export function Navbar() {
  const { pathname } = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        isScrolled ? 'border-b shadow-soft' : 'border-transparent'
      )}
    >
      <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="font-heading font-bold text-xl text-secondary">TextTile</span>
        </Link>
        
        <nav className="hidden lg:flex items-center space-x-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'text-sm font-medium transition-colors hover:text-accent',
                pathname === link.path ? 'text-accent' : 'text-foreground/80'
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/login">
            <Button variant="primary">Login</Button>
          </Link>
        </nav>

        <div className="lg:hidden">
          <MobileNav links={NAV_LINKS} />
        </div>
      </div>
    </header>
  );
}
