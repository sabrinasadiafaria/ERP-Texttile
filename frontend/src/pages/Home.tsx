import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Container } from '@/components/ui/Container';
import { StatisticCard } from '@/components/ui/StatisticCard';
import { ProductCard } from '@/components/ui/ProductCard';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CapabilityCard } from '@/components/ui/CapabilityCard';
import { SustainabilityCard } from '@/components/ui/SustainabilityCard';
import { CertificationCard } from '@/components/ui/CertificationCard';
import { CTASection } from '@/components/ui/CTASection';
import { Factory, Cpu, ShieldCheck, Zap, Leaf, Recycle, Droplets } from 'lucide-react';
import heroImage from '@/assets/hero.png';

export function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background pt-24 pb-32 md:pt-32 md:pb-40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 dark:bg-[linear-gradient(to_right,#1f2028_1px,transparent_1px),linear-gradient(to_bottom,#1f2028_1px,transparent_1px)]" />
        
        <Container className="relative relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Text Content */}
          <div className="flex flex-col space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading tracking-tight text-foreground">
                Empowering Global <br className="hidden lg:block" />
                <span className="text-accent">Apparel Manufacturing</span>
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              TextTile ERP is the modern platform for premium manufacturing, streamlining supply chains, and driving engineering excellence across your entire operation.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4"
            >
              <Button size="lg" className="w-full sm:w-auto">
                Get Started
              </Button>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Learn More
              </Button>
            </motion.div>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
            className="relative mx-auto w-full max-w-lg lg:max-w-none"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border bg-card/50 backdrop-blur-sm">
              <img
                src={heroImage}
                alt="TextTile ERP Dashboard Overview"
                className="w-full h-auto object-cover"
                loading="eager"
              />
            </div>
            
            {/* Decorative background elements */}
            <div className="absolute -z-10 -top-12 -right-12 w-64 h-64 bg-accent/20 rounded-full blur-3xl opacity-50" />
            <div className="absolute -z-10 -bottom-12 -left-12 w-64 h-64 bg-secondary/20 rounded-full blur-3xl opacity-50" />
          </motion.div>
        </Container>
      </section>

      {/* Company Introduction Section */}
      <section className="py-24 bg-secondary/5">
        <Container>
          <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold font-heading text-secondary"
            >
              Pioneering the Future of Apparel
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg text-muted-foreground leading-relaxed"
            >
              With over two decades of engineering excellence, TextTile combines state-of-the-art manufacturing with innovative software solutions to deliver unmatched quality and scalability.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: '20+ Years', desc: 'Of manufacturing excellence and innovation.' },
              { title: 'Global Reach', desc: 'Partnering with top brands worldwide.' },
              { title: 'ISO Certified', desc: 'Highest standards in quality and sustainability.' },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                className="bg-card border rounded-xl p-8 text-center shadow-soft hover:shadow-lg transition-shadow"
              >
                <h3 className="text-2xl font-bold text-accent mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* Statistics Section */}
      <section className="py-20 bg-background border-t">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <StatisticCard value="50M+" label="Units Produced" description="Annually across facilities" />
            <StatisticCard value="12" label="Global Hubs" description="Spanning 4 continents" />
            <StatisticCard value="99.9%" label="Quality Rate" description="Defect-free output" />
            <StatisticCard value="100%" label="Renewable" description="Powered by clean energy" />
          </div>
        </Container>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 bg-secondary/5">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
            <div className="max-w-2xl">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-4xl font-bold font-heading text-secondary mb-4"
              >
                Featured Solutions
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-lg text-muted-foreground"
              >
                Discover our enterprise-grade apparel manufacturing systems designed for scalability, precision, and sustainability.
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button variant="outline" size="md">
                View All Products
              </Button>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProductCard
              id="1"
              name="TextTile Core ERP"
              description="The foundational enterprise resource planning platform tailored specifically for the apparel industry supply chain."
              imageUrl={heroImage}
              ctaText="Explore Core"
            />
            <ProductCard
              id="2"
              name="TextTile AutoCut"
              description="Advanced automated fabric cutting integration software reducing waste and improving precision."
              imageUrl={heroImage}
              ctaText="Explore AutoCut"
            />
            <ProductCard
              id="3"
              name="TextTile Green"
              description="Sustainability tracking and compliance module ensuring ISO standards across all your global factories."
              imageUrl={heroImage}
              ctaText="Explore Green"
            />
          </div>
        </Container>
      </section>

      {/* Manufacturing Capabilities Section */}
      <section className="py-24 bg-background">
        <Container>
          <SectionHeader
            title="Advanced Manufacturing Capabilities"
            description="From raw materials to finished garments, our state-of-the-art facilities leverage cutting-edge technology to ensure precision, speed, and uncompromising quality."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-12">
            <CapabilityCard
              title="Smart Factories"
              description="Fully integrated IoT sensors providing real-time production tracking and automated quality control."
              icon={<Factory className="w-7 h-7" />}
              delay={0}
            />
            <CapabilityCard
              title="AI-Driven Planning"
              description="Predictive algorithms optimize supply chain logistics and minimize material waste."
              icon={<Cpu className="w-7 h-7" />}
              delay={0.1}
            />
            <CapabilityCard
              title="ISO 9001 Quality"
              description="Stringent multi-stage inspections guaranteeing defect-free apparel manufacturing."
              icon={<ShieldCheck className="w-7 h-7" />}
              delay={0.2}
            />
            <CapabilityCard
              title="Rapid Prototyping"
              description="Accelerated concept-to-sample pipelines bringing your designs to life in record time."
              icon={<Zap className="w-7 h-7" />}
              delay={0.3}
            />
          </div>
        </Container>
      </section>

      {/* Sustainability Section */}
      <section className="py-24 bg-secondary/5">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Text Content */}
            <div className="flex flex-col">
              <SectionHeader
                title="Committed to a Greener Future"
                description="We believe that premium apparel manufacturing shouldn't come at the cost of our planet. TextTile ERP integrates sustainability into every layer of the production cycle."
                align="left"
                className="mb-8"
              />
              
              <div className="space-y-4">
                <SustainabilityCard
                  title="Zero Waste Manufacturing"
                  description="Our AutoCut integration reduces fabric waste by up to 25% through AI-driven pattern optimization."
                  icon={<Recycle className="w-6 h-6" />}
                  delay={0}
                />
                <SustainabilityCard
                  title="100% Renewable Energy"
                  description="Over 80% of our global manufacturing hubs are fully powered by solar and wind energy."
                  icon={<Zap className="w-6 h-6" />}
                  delay={0.1}
                />
                <SustainabilityCard
                  title="Water Conservation"
                  description="Closed-loop water recycling systems recover 95% of water used in the dyeing process."
                  icon={<Droplets className="w-6 h-6" />}
                  delay={0.2}
                />
                <SustainabilityCard
                  title="Eco-Friendly Materials"
                  description="Certified organic and recycled fibers seamlessly tracked via our Green compliance module."
                  icon={<Leaf className="w-6 h-6" />}
                  delay={0.3}
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-10"
              >
                <Button size="lg">Read Our Impact Report</Button>
              </motion.div>
            </div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative hidden lg:block"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border aspect-[4/5]">
                <img
                  src={heroImage}
                  alt="Sustainable manufacturing facility"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-card/80 backdrop-blur-md p-6 rounded-xl border">
                    <h4 className="text-xl font-bold text-success mb-2">Our 2030 Pledge</h4>
                    <p className="text-sm text-foreground">
                      TextTile is committed to achieving net-zero carbon emissions across our entire supply chain by 2030.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -z-10 top-1/2 -right-12 w-64 h-64 bg-success/20 rounded-full blur-3xl opacity-50 transform -translate-y-1/2" />
            </motion.div>

          </div>
        </Container>
      </section>

      {/* Certifications Section */}
      <section className="py-24 bg-background border-t border-border/50">
        <Container>
          <SectionHeader
            title="Industry-Leading Compliance"
            description="Our manufacturing processes adhere to the strictest global standards, ensuring top-tier quality, ethical labor practices, and environmental stewardship."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <CertificationCard
              name="ISO 9001:2015"
              organization="International Organization for Standardization"
              description="Certified for our comprehensive Quality Management Systems across all core manufacturing and software operations."
              date="Oct 2023"
              delay={0}
            />
            <CertificationCard
              name="GOTS Certified"
              organization="Global Organic Textile Standard"
              description="Recognized for ecological and social responsibility in the processing, manufacturing, and trading of organic textiles."
              date="Jan 2024"
              delay={0.1}
            />
            <CertificationCard
              name="WRAP Gold"
              organization="Worldwide Responsible Accredited Production"
              description="Achieved Gold certification for safe, lawful, humane, and ethical manufacturing practices worldwide."
              date="Mar 2024"
              delay={0.2}
            />
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center mt-12"
          >
            <Button variant="outline" size="lg">
              View All Accreditations
            </Button>
          </motion.div>
        </Container>
      </section>

      {/* Final CTA Section */}
      <CTASection
        headline="Ready to Transform Your Manufacturing?"
        description="Join leading global apparel brands leveraging TextTile ERP to streamline production, enhance quality, and scale sustainably."
        primaryCtaText="Request a Demo"
        secondaryCtaText="Contact Sales"
      />
    </div>
  );
}
