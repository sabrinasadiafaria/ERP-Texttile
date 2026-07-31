import { motion } from 'framer-motion';
import { Award } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CertificationCardProps {
  name: string;
  description: string;
  organization?: string;
  date?: string;
  imageUrl?: string;
  delay?: number;
  className?: string;
}

export function CertificationCard({
  name,
  description,
  organization,
  date,
  imageUrl,
  delay = 0,
  className,
}: CertificationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4, delay }}
      className={cn(
        'flex flex-col bg-card rounded-2xl border border-border/50 shadow-soft hover:shadow-lg transition-all overflow-hidden p-6',
        className
      )}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-shrink-0 w-16 h-16 bg-muted rounded-xl flex items-center justify-center overflow-hidden">
          {imageUrl ? (
            <img src={imageUrl} alt={`${name} logo`} className="w-full h-full object-contain p-2" loading="lazy" />
          ) : (
            <Award className="w-8 h-8 text-muted-foreground" />
          )}
        </div>
        <div>
          <h4 className="text-lg font-bold font-heading text-card-foreground leading-tight">{name}</h4>
          {organization && (
            <p className="text-sm font-medium text-accent mt-1">{organization}</p>
          )}
        </div>
      </div>
      
      <p className="text-muted-foreground text-sm leading-relaxed flex-1">
        {description}
      </p>

      {date && (
        <div className="mt-6 pt-4 border-t border-border/50 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Issued: {date}
        </div>
      )}
    </motion.div>
  );
}
