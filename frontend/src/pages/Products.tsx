import { motion } from 'framer-motion';
import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { ProductCard } from '@/components/ui/ProductCard';
import { CTASection } from '@/components/ui/CTASection';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
import heroImage from '@/assets/hero.png';

// Mock Data Structure ready for future API integration
const CATEGORIES = ['All', 'Core Software', 'Factory Automation', 'Compliance', 'Logistics'];

const PRODUCTS = [
  {
    id: '1',
    name: 'TextTile Core ERP',
    category: 'Core Software',
    description: 'The foundational enterprise resource planning platform tailored specifically for the apparel industry supply chain.',
    imageUrl: heroImage,
    ctaText: 'Explore Core',
  },
  {
    id: '2',
    name: 'TextTile AutoCut',
    category: 'Factory Automation',
    description: 'Advanced automated fabric cutting integration software reducing waste and improving precision.',
    imageUrl: heroImage,
    ctaText: 'Explore AutoCut',
  },
  {
    id: '3',
    name: 'TextTile Green',
    category: 'Compliance',
    description: 'Sustainability tracking and compliance module ensuring ISO standards across all your global factories.',
    imageUrl: heroImage,
    ctaText: 'Explore Green',
  },
  {
    id: '4',
    name: 'TextTile Logistics',
    category: 'Logistics',
    description: 'AI-driven supply chain logistics platform optimizing delivery routes and minimizing warehouse holding times.',
    imageUrl: heroImage,
    ctaText: 'Explore Logistics',
  },
  {
    id: '5',
    name: 'TextTile HR Sync',
    category: 'Core Software',
    description: 'Integrated human resources and payroll management designed for large-scale manufacturing workforces.',
    imageUrl: heroImage,
    ctaText: 'Explore HR Sync',
  },
  {
    id: '6',
    name: 'TextTile Quality Control',
    category: 'Factory Automation',
    description: 'Computer vision and IoT sensor integration for real-time defect detection on the assembly line.',
    imageUrl: heroImage,
    ctaText: 'Explore QC',
  }
];

export function Products() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = PRODUCTS.filter(
    p => activeCategory === 'All' || p.category === activeCategory
  );

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-24 pb-16 md:pt-32 md:pb-24 border-b border-border/50">
        <Container className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading tracking-tight text-foreground mb-6"
          >
            Comprehensive Solutions for <br className="hidden sm:block" />
            <span className="text-accent">Apparel Manufacturing</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            Discover our suite of enterprise-grade software and automation tools designed to optimize every stage of your production lifecycle.
          </motion.p>
        </Container>
      </section>

      {/* Main Content */}
      <section className="py-24 bg-secondary/5">
        <Container>
          {/* Categories / Filter */}
          <div className="flex flex-col items-center mb-16">
            <SectionHeader
              title="Our Product Suite"
              description="Filter by category to find the specific modules that fit your operational needs."
              align="center"
              className="mb-8"
            />
            
            <div className="flex flex-wrap justify-center gap-3">
              {CATEGORIES.map((cat) => (
                <Button
                  key={cat}
                  variant={activeCategory === cat ? 'primary' : 'outline'}
                  size="md"
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    'rounded-full px-6 transition-all',
                    activeCategory === cat 
                      ? 'bg-accent text-accent-foreground hover:bg-accent/90 border-transparent' 
                      : 'hover:border-accent hover:text-accent'
                  )}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                key={product.id}
              >
                <ProductCard
                  id={product.id}
                  name={product.name}
                  description={product.description}
                  imageUrl={product.imageUrl}
                  ctaText={product.ctaText}
                />
              </motion.div>
            ))}
          </motion.div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              No products found in this category.
            </div>
          )}
        </Container>
      </section>

      {/* CTA Section */}
      <CTASection
        headline="Ready to Upgrade Your Operations?"
        description="Contact our enterprise team for a customized demonstration of the TextTile platform tailored to your specific manufacturing workflows."
        primaryCtaText="Request a Demo"
        secondaryCtaText="Contact Sales"
      />
    </div>
  );
}
