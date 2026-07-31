import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface SectionHeaderProps {
  title: string;
  description?: string;
  align?: 'left' | 'center' | 'right';
  className?: string;
}

export function SectionHeader({ title, description, align = 'center', className }: SectionHeaderProps) {
  return (
    <div className={cn('mb-12 max-w-2xl', {
      'text-left': align === 'left',
      'text-center mx-auto': align === 'center',
      'text-right ml-auto': align === 'right',
    }, className)}>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold font-heading text-secondary mb-4"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className={cn("text-lg text-muted-foreground", {
            'mx-auto': align === 'center'
          })}
        >
          {description}
        </motion.p>
      )}
    </div>
  );
}
