import { motion } from 'framer-motion';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CTASection } from '@/components/ui/CTASection';
import { CertificationCard } from '@/components/ui/CertificationCard';
import { Shield, Award, CheckCircle } from 'lucide-react';

// Mock Data
const CERTIFICATIONS = [
  {
    title: 'ISO 9001:2015',
    organization: 'International Organization for Standardization',
    description: 'Certified for Quality Management Systems across all global manufacturing facilities.',
  },
  {
    title: 'ISO 14001:2015',
    organization: 'International Organization for Standardization',
    description: 'Certified for Environmental Management Systems and sustainable operational practices.',
  },
  {
    title: 'SA8000',
    organization: 'Social Accountability International',
    description: 'Certified for fair labor practices, safe working conditions, and ethical compliance.',
  },
  {
    title: 'OEKO-TEX® Standard 100',
    organization: 'OEKO-TEX Association',
    description: 'Ensuring all textiles and fabrics are free from harmful substances and safe for human use.',
  },
  {
    title: 'GOTS',
    organization: 'Global Organic Textile Standard',
    description: 'Certified organic status of textiles, from harvesting of raw materials through manufacturing.',
  },
  {
    title: 'Bluesign® System Partner',
    organization: 'Bluesign Technologies',
    description: 'Commitment to sustainable chemistry, clean processes, and worker safety.',
  }
];

export function Certifications() {
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
              <Award className="w-8 h-8 text-accent" />
            </div>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading tracking-tight text-foreground mb-6"
          >
            Verified <span className="text-accent">Excellence</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            Our commitment to quality, environmental responsibility, and ethical labor is backed by the world's most rigorous certification bodies.
          </motion.p>
        </Container>
      </section>

      {/* Grid Section */}
      <section className="py-24 bg-secondary/5">
        <Container>
          <SectionHeader
            title="Industry Certifications"
            description="Explore the standards we adhere to across our global operations."
            align="center"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
            {CERTIFICATIONS.map((cert, i) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <CertificationCard
                  name={cert.title}
                  organization={cert.organization}
                  description={cert.description}
                />
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Quality Commitment Section */}
      <section className="py-24 bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">Our Commitment to Quality</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Compliance is just the baseline. At TextTile, we build compliance tracking directly into our ERP software, ensuring that every factory on our network maintains real-time audit readiness.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-foreground">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-4 h-4 text-accent" />
                  </div>
                  Real-time compliance monitoring
                </li>
                <li className="flex items-center gap-3 text-foreground">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-4 h-4 text-accent" />
                  </div>
                  Automated audit reporting
                </li>
                <li className="flex items-center gap-3 text-foreground">
                  <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <CheckCircle className="w-4 h-4 text-accent" />
                  </div>
                  Strict supplier vetting processes
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-card p-10 rounded-3xl shadow-xl border border-border/50 text-center"
            >
              <Shield className="w-16 h-16 text-accent mx-auto mb-6" />
              <h3 className="text-2xl font-bold font-heading mb-4">Enterprise Grade Security</h3>
              <p className="text-muted-foreground leading-relaxed">
                In addition to manufacturing standards, TextTile ERP holds strict SOC 2 Type II and ISO 27001 certifications, ensuring your proprietary supply chain data remains encrypted and secure at all times.
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <CTASection
        headline="Require specific compliance documentation?"
        description="Our compliance team can provide detailed audit reports and certification records for all of our global facilities upon request."
        primaryCtaText="Request Documentation"
        secondaryCtaText="Contact Compliance"
      />
    </div>
  );
}
