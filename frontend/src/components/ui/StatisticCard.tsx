import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface StatisticCardProps {
  /** Optional icon to display above the value */
  icon?: ReactNode;
  /** The primary numeric or string value */
  value: string | number;
  /** The label describing the value */
  label: string;
  /** Optional extended description */
  description?: string;
  /** Whether to animate on scroll */
  animate?: boolean;
  className?: string;
}

export function StatisticCard({
  icon,
  value,
  label,
  description,
  animate = true,
  className,
}: StatisticCardProps) {
  const content = (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-6 text-center bg-card rounded-xl border shadow-soft transition-all hover:shadow-md',
        className
      )}
    >
      {icon && <div className="mb-4 text-accent">{icon}</div>}
      <div className="text-4xl font-bold font-heading text-foreground mb-2">
        {value}
      </div>
      <div className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-1">
        {label}
      </div>
      {description && (
        <div className="text-sm text-muted-foreground/80 mt-2">{description}</div>
      )}
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}
