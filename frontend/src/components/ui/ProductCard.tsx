import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

export interface ProductCardProps {
  id: string | number;
  name: string;
  description: string;
  imageUrl: string;
  ctaText?: string;
}

export function ProductCard({ name, description, imageUrl, ctaText = 'Learn More' }: ProductCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="group flex flex-col bg-card rounded-2xl overflow-hidden border shadow-soft hover:shadow-lg transition-all"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <img
          src={imageUrl}
          alt={`Image of ${name}`}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-xl font-bold font-heading text-card-foreground mb-2">
          {name}
        </h3>
        <p className="text-muted-foreground mb-6 flex-1 line-clamp-3">
          {description}
        </p>
        <Button variant="outline" className="w-full mt-auto" aria-label={`View details for ${name}`}>
          {ctaText}
        </Button>
      </div>
    </motion.div>
  );
}
