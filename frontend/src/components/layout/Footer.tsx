import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, ArrowUp } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

function FooterBrand() {
  return (
    <div className="flex flex-col space-y-4">
      <Link to="/" className="flex items-center gap-2 group">
        <motion.div 
          whileHover={{ scale: 1.08, rotate: 2 }}
          className="w-8 h-8 rounded bg-accent flex items-center justify-center text-accent-foreground font-bold text-xl shadow-sm"
        >
          A
        </motion.div>
        <span className="font-heading font-bold text-2xl tracking-tight text-secondary-foreground">Al Amin Export Ltd.</span>
      </Link>
      <p className="text-secondary-foreground/70 text-sm leading-relaxed max-w-sm mt-4">
        Al Amin Export Ltd. is a 100% export-oriented premium sweater and knitwear manufacturer, empowering leading international brands with precision, scale, and sustainability.
      </p>
    </div>
  );
}

function FooterNavigation() {
  const links = [
    { title: 'Products', items: [{ name: 'Core ERP', to: '/products' }, { name: 'AutoCut', to: '/products' }, { name: 'Green Module', to: '/products' }] },
    { title: 'Capabilities', items: [{ name: 'Smart Factories', to: '/capabilities' }, { name: 'Quality Control', to: '/capabilities' }, { name: 'Supply Chain', to: '/capabilities' }] },
    { title: 'Company', items: [{ name: 'About Us', to: '/about' }, { name: 'Sustainability', to: '/sustainability' }, { name: 'Certifications', to: '/certifications' }, { name: 'Contact', to: '/contact' }] }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
      {links.map((section) => (
        <div key={section.title} className="flex flex-col space-y-4">
          <h4 className="font-heading font-bold text-secondary-foreground">{section.title}</h4>
          <ul className="flex flex-col space-y-2">
            {section.items.map((item) => (
              <li key={item.name}>
                <Link to={item.to} className="text-sm text-secondary-foreground/70 hover:text-accent transition-colors">
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function FooterContact() {
  return (
    <div className="flex flex-col space-y-4">
      <h4 className="font-heading font-bold text-secondary-foreground">Contact Us</h4>
      <ul className="flex flex-col space-y-3">
        <li className="flex items-start gap-3 text-sm text-secondary-foreground/70">
          <MapPin className="w-5 h-5 text-accent shrink-0" />
          <span>123 Manufacturing Dist.<br />Industrial Park, NY 10001</span>
        </li>
        <li className="flex items-center gap-3 text-sm text-secondary-foreground/70">
          <Phone className="w-5 h-5 text-accent shrink-0" />
          <span>+1 (555) 123-4567</span>
        </li>
        <li className="flex items-center gap-3 text-sm text-secondary-foreground/70">
          <Mail className="w-5 h-5 text-accent shrink-0" />
          <span>partners@alaminexport.com</span>
        </li>
      </ul>
    </div>
  );
}

function FooterSocialLinks() {
  const socials = [
    {
      name: 'Facebook',
      href: '#',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
        </svg>
      )
    },
    {
      name: 'Twitter',
      href: '#',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
        </svg>
      )
    },
    {
      name: 'Instagram',
      href: '#',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      href: '#',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
          <rect x="2" y="9" width="4" height="12"></rect>
          <circle cx="4" cy="4" r="2"></circle>
        </svg>
      )
    }
  ];

  return (
    <div className="flex items-center gap-4 mt-6">
      {socials.map((social, i) => (
        <motion.a
          key={i}
          whileHover={{ scale: 1.15, y: -2 }}
          whileTap={{ scale: 0.95 }}
          href={social.href}
          className="w-10 h-10 rounded-full bg-secondary-foreground/10 flex items-center justify-center text-secondary-foreground/80 hover:bg-accent hover:text-accent-foreground transition-colors shadow-sm"
          aria-label={social.name}
        >
          {social.icon}
        </motion.a>
      ))}
    </div>
  );
}

function FooterBottom() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-secondary-foreground/20 mt-16 gap-4">
      <p className="text-sm text-secondary-foreground/50 text-center md:text-left">
        &copy; {new Date().getFullYear()} Al Amin Export Ltd. All rights reserved.
      </p>
      
      <div className="flex items-center gap-6 text-sm text-secondary-foreground/50">
        <Link to="/privacy" className="hover:text-secondary-foreground transition-colors">Privacy Policy</Link>
        <Link to="/terms" className="hover:text-secondary-foreground transition-colors">Terms of Service</Link>
      </div>

      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Button
          variant="outline"
          onClick={scrollToTop}
          className="rounded-full bg-secondary-foreground/10 hover:bg-accent hover:text-accent-foreground text-secondary-foreground/80 w-10 h-10 p-0"
          aria-label="Back to top"
        >
          <ArrowUp className="w-5 h-5" />
        </Button>
      </motion.div>
    </div>
  );
}

export function Footer() {
  return (
    <motion.footer 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-secondary text-secondary-foreground mt-auto pt-20 pb-8 overflow-hidden"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          {/* Brand & Socials */}
          <div className="lg:col-span-4 flex flex-col">
            <FooterBrand />
            <FooterSocialLinks />
          </div>
          
          {/* Navigation */}
          <div className="lg:col-span-5">
            <FooterNavigation />
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <FooterContact />
          </div>
        </div>

        <FooterBottom />
      </Container>
    </motion.footer>
  );
}
