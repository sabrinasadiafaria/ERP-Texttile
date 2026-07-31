import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CTASection } from '@/components/ui/CTASection';
import { StatisticCard } from '@/components/ui/StatisticCard';
import { Leaf, Recycle, Droplets, Sun, Wind, Battery } from 'lucide-react';
import heroImage from '@/assets/hero.png';

// Mock Data
const PILLARS = [
  {
    id: '1',
    title: 'Zero Waste Manufacturing',
    description: 'Our proprietary AutoCut system optimizes fabric usage, and all remaining textiles are recycled or upcycled.',
    icon: <Recycle className="w-6 h-6 text-accent" />
  },
  {
    id: '2',
    title: 'Water Stewardship',
    description: 'Closed-loop water recycling systems in our dyeing facilities reduce freshwater consumption by up to 85%.',
    icon: <Droplets className="w-6 h-6 text-accent" />
  },
  {
    id: '3',
    title: 'Renewable Energy',
    description: 'Transitioning our global facilities to 100% renewable energy by 2030 through solar and wind investments.',
    icon: <Sun className="w-6 h-6 text-accent" />
  },
  {
    id: '4',
    title: 'Ethical Labor',
    description: 'Ensuring fair wages, safe conditions, and continuous education for our 50,000+ workers worldwide.',
    icon: <Leaf className="w-6 h-6 text-accent" />
  }
];

const METRICS = [
  { label: 'Carbon Reduction', value: '42%', description: 'Since 2020 baseline' },
  { label: 'Water Recycled', value: '85%', description: 'In our dyeing facilities' },
  { label: 'Renewable Energy', value: '60%', description: 'Across all global hubs' },
  { label: 'Waste to Landfill', value: '< 2%', description: 'Achieved through upcycling' }
];

export function Sustainability() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-24 pb-16 md:pt-32 md:pb-24 border-b border-border/50">
        <Container className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
              <Leaf className="w-8 h-8 text-accent" />
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading tracking-tight text-foreground mb-6"
          >
            Manufacturing with a <br className="hidden sm:block" />
            <span className="text-accent">Conscience</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            We believe that large-scale production shouldn't come at the expense of our planet. TextTile is committed to pioneering sustainable practices across the entire apparel supply chain.
          </motion.p>
        </Container>
      </section>

      {/* Vision / Intro Split */}
      <section className="py-24 bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl"
            >
              <img src={heroImage} alt="Sustainability Vision" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="text-white text-xl font-medium font-heading">"Our goal is not just to reduce harm, but to actively regenerate the ecosystems we operate in."</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">Our 2030 Vision</h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Sustainability is embedded into the core architecture of our ERP platform. By digitizing the supply chain, we eliminate inefficiencies that traditionally lead to massive industrial waste.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Beyond software, our physical facilities operate under strict environmental guidelines. We are systematically replacing legacy machinery with energy-efficient alternatives and transitioning completely to renewable power sources.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col space-y-2">
                  <Wind className="w-6 h-6 text-accent" />
                  <span className="font-semibold">Carbon Neutral</span>
                  <span className="text-sm text-muted-foreground">Targeting Scope 1 & 2 emissions by 2028.</span>
                </div>
                <div className="flex flex-col space-y-2">
                  <Battery className="w-6 h-6 text-accent" />
                  <span className="font-semibold">Energy Efficient</span>
                  <span className="text-sm text-muted-foreground">Smart factories powered by green tech.</span>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Key Pillars */}
      <section className="py-24 bg-secondary/5">
        <Container>
          <SectionHeader
            title="Sustainability Pillars"
            description="The four foundational principles guiding our environmental and social governance."
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {PILLARS.map((pillar, i) => (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="bg-card p-8 rounded-3xl border border-border/50 shadow-soft h-full hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-6">
                    {pillar.icon}
                  </div>
                  <h4 className="text-xl font-bold font-heading mb-3">{pillar.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">{pillar.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Metrics */}
      <section className="py-24 bg-secondary text-secondary-foreground">
        <Container>
          <SectionHeader
            title="Measuring Impact"
            description="We believe in transparency. Here is our progress toward our 2030 sustainability targets."
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {METRICS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <StatisticCard
                  value={stat.value}
                  label={stat.label}
                  description={stat.description}
                />
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <CTASection
        headline="Join the Green Revolution"
        description="Discover how our Green Module can help your brand track emissions, ensure ethical sourcing, and achieve compliance."
        primaryCtaText="Explore Green Module"
        secondaryCtaText="Read CSR Report"
      />
    </div>
  );
}
