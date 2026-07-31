import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CTASection } from '@/components/ui/CTASection';
import { CapabilityCard } from '@/components/ui/CapabilityCard';
import { StatisticCard } from '@/components/ui/StatisticCard';
import { ShieldCheck, Factory, Cpu, Settings, TrendingUp, Search } from 'lucide-react';
import heroImage from '@/assets/hero.png';

// Mock Data
const CAPABILITIES = [
  {
    id: '1',
    title: 'Precision Fabric Cutting',
    description: 'Automated and laser-guided cutting floors capable of sub-millimeter accuracy.',
  },
  {
    id: '2',
    title: 'Smart Stitching',
    description: 'IoT-enabled sewing machines tracking stitch count and tension in real-time.',
  },
  {
    id: '3',
    title: 'Automated Sorting',
    description: 'Robotic sorting and material handling systems reducing manual labor constraints.',
  },
  {
    id: '4',
    title: 'Quality Assurance',
    description: 'AI computer vision cameras scanning every garment for microscopic defects.',
  }
];

const STATISTICS = [
  { label: 'Annual Capacity', value: '50M+', description: 'Units produced globally' },
  { label: 'Defect Rate', value: '< 0.1%', description: 'Industry-leading quality' },
  { label: 'Automated Facilities', value: '12', description: 'Smart factories active' },
  { label: 'Uptime', value: '99.9%', description: 'Operational reliability' }
];

export function Capabilities() {
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
            Engineering the Future of <br className="hidden sm:block" />
            <span className="text-accent">Production</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            Explore our state-of-the-art facilities, next-generation automation technologies, and the rigorous processes that drive our operational excellence.
          </motion.p>
        </Container>
      </section>

      {/* Production Capabilities */}
      <section className="py-24 bg-secondary/5">
        <Container>
          <SectionHeader
            title="Core Capabilities"
            description="Our facilities are equipped with the most advanced technologies in the apparel sector."
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
            {CAPABILITIES.map((cap, i) => (
              <motion.div
                key={cap.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <CapabilityCard
                  title={cap.title}
                  description={cap.description}
                  icon={i % 2 === 0 ? <Factory className="w-6 h-6 text-accent" /> : <Cpu className="w-6 h-6 text-accent" />}
                />
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Machinery & Technology */}
      <section className="py-24 bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">Advanced Machinery & Technology</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                We continuously reinvest in our infrastructure, deploying proprietary IoT sensors, robotic manipulation arms, and predictive maintenance algorithms across all production lines.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-foreground">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                    <Settings className="w-4 h-4 text-accent" />
                  </div>
                  Fully digitized supply chain tracking
                </li>
                <li className="flex items-center gap-3 text-foreground">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-accent" />
                  </div>
                  Predictive AI for machine maintenance
                </li>
                <li className="flex items-center gap-3 text-foreground">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                    <Search className="w-4 h-4 text-accent" />
                  </div>
                  Real-time yield optimization software
                </li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl"
            >
              <img src={heroImage} alt="Machinery" className="w-full h-full object-cover" />
            </motion.div>
          </div>
        </Container>
      </section>

      {/* Statistics */}
      <section className="py-24 bg-secondary text-secondary-foreground">
        <Container>
          <SectionHeader
            title="Operational Scale"
            description="Delivering unparalleled volume without compromising on quality or speed."
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
            {STATISTICS.map((stat, i) => (
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

      {/* Quality Assurance */}
      <section className="py-24 bg-background">
        <Container className="text-center max-w-3xl mx-auto">
          <ShieldCheck className="w-16 h-16 text-accent mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">Uncompromising Quality Assurance</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Every garment that leaves our facilities passes through a rigorous 14-point inspection protocol, combining automated AI scanning with expert human verification to guarantee perfection.
          </p>
        </Container>
      </section>

      {/* CTA Section */}
      <CTASection
        headline="Ready to scale your production?"
        description="Partner with us to leverage our advanced manufacturing capabilities and bring your designs to market faster."
        primaryCtaText="Contact Sales"
        secondaryCtaText="View Certifications"
      />
    </div>
  );
}
