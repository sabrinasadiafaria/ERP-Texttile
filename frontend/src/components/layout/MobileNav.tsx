import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface MobileNavProps {
  links: Array<{ name: string; path: string }>;
}

export function MobileNav({ links }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();

  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  return (
    <div>
      <button onClick={toggle} className="p-2 text-foreground hover:text-accent transition-colors" aria-label="Toggle Menu">
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>
      
      {isOpen && (
        <div className="absolute top-16 left-0 w-full bg-background border-b shadow-soft p-4 flex flex-col space-y-4">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={close}
              className={cn(
                'text-sm font-medium transition-colors p-2 rounded-md hover:bg-muted',
                pathname === link.path ? 'text-accent font-bold bg-accent/5' : 'text-foreground'
              )}
            >
              {link.name}
            </Link>
          ))}
          <Link to="/login" className="w-full">
            <Button variant="primary" className="w-full" onClick={close}>Login</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
