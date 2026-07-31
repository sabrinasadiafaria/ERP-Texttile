import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/utils';

export interface CTASectionProps {
  headline: string;
  description: string;
  primaryCtaText?: string;
  secondaryCtaText?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
  className?: string;
}

export function CTASection({
  headline,
  description,
  primaryCtaText = 'Get Started',
  secondaryCtaText,
  onPrimaryClick,
  onSecondaryClick,
  className,
}: CTASectionProps) {
  return (
    <section className={cn('relative py-24 overflow-hidden bg-primary text-primary-foreground', className)}>
      {/* Decorative Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />
      <div className="absolute -z-10 -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl opacity-50" />
      <div className="absolute -z-10 -bottom-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl opacity-50" />

      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold font-heading tracking-tight"
          >
            {headline}
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-primary-foreground/90 leading-relaxed"
          >
            {description}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full"
          >
            <Button
              size="lg"
              className="w-full sm:w-auto bg-background text-foreground hover:bg-muted hover:text-foreground"
              onClick={onPrimaryClick}
            >
              {primaryCtaText}
            </Button>
            {secondaryCtaText && (
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                onClick={onSecondaryClick}
              >
                {secondaryCtaText}
              </Button>
            )}
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
