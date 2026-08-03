import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
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
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300',
        isTransparent
          ? 'bg-transparent py-4'
          : 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2 border-b border-border shadow-soft'
      )}
    >
      <div className="container mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2 group">
          <motion.span 
            whileHover={{ scale: 1.02 }}
            className={cn("font-heading font-bold text-2xl tracking-tight transition-colors", isTransparent ? "text-white" : "text-foreground")}
          >
            AL-Amin Export ltd.
          </motion.span>
        </Link>
        
        <nav className="hidden lg:flex items-center space-x-8">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'relative text-sm font-medium transition-colors py-1',
                  isTransparent 
                    ? (isActive ? 'text-white font-semibold' : 'text-white/80 hover:text-white') 
                    : (isActive ? 'text-accent font-semibold' : 'text-foreground/80 hover:text-accent')
                )}
              >
                <span>{link.name}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className={cn(
                      "absolute bottom-0 left-0 right-0 h-0.5 rounded-full",
                      isTransparent ? "bg-white" : "bg-accent"
                    )}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
          <Link to="/login">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Button 
                variant="primary" 
                className={cn(
                  "rounded-full px-8 uppercase tracking-widest text-xs font-bold transition-all shadow-sm",
                  isTransparent 
                    ? "bg-transparent border border-white text-white hover:bg-white hover:text-black" 
                    : "bg-black text-white hover:bg-black/80"
                )}
              >
                LOGIN
              </Button>
            </motion.div>
          </Link>
        </nav>

        <div className="lg:hidden">
          <MobileNav links={NAV_LINKS} isTransparent={isTransparent} />
        </div>
      </div>
    </motion.header>
  );
}
