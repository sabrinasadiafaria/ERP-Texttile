import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

export interface SustainabilityCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  delay?: number;
}

export function SustainabilityCard({ title, description, icon, delay = 0 }: SustainabilityCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="flex items-start gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors border border-transparent hover:border-border"
    >
      <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-success/10 text-success">
        {icon}
      </div>
      <div>
        <h4 className="text-lg font-semibold text-foreground mb-1">{title}</h4>
        <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}
