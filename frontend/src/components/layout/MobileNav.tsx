import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface MobileNavProps {
  links: { name: string; path: string }[];
  isTransparent?: boolean;
}

export function MobileNav({ links, isTransparent }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const close = () => setIsOpen(false);

  return (
    <div className="relative">
      <button onClick={toggle} className={cn("p-2", isTransparent ? "text-white" : "text-foreground")}>
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {isOpen && (
        <div className="absolute top-12 right-0 w-64 bg-background border rounded-lg shadow-xl p-4 flex flex-col space-y-4 animate-in slide-in-from-top-2">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={close}
              className="text-foreground hover:text-accent font-medium py-2 border-b border-border/50 last:border-0"
            >
              {link.name}
            </Link>
          ))}
          <Link to="/login" className="w-full">
            <Button variant="primary" className="w-full bg-black text-white hover:bg-black/80 rounded-full" onClick={close}>LOGIN</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
