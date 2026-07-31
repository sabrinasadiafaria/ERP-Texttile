import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

export interface CapabilityCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  delay?: number;
}

export function CapabilityCard({ title, description, icon, delay = 0 }: CapabilityCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, delay }}
      className="flex flex-col p-8 bg-card rounded-2xl shadow-soft hover:shadow-lg border border-border/50 transition-all group"
    >
      <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
        {icon || <div className="w-6 h-6 bg-current rounded-full opacity-50" />}
      </div>
      <h3 className="text-xl font-bold font-heading text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed flex-1">{description}</p>
    </motion.div>
  );
}
