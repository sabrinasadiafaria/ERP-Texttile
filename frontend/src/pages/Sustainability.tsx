import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Droplet, 
  Sun, 
  ShieldCheck, 
  Award, 
  Leaf, 
  Recycle, 
  Zap, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  ChevronDown, 
  TreePine, 
  Check,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Image assets
import greenFactory from '@/assets/green-factory.jpg';
import manufacturingHero from '@/assets/manufacturing-hero.jpg';
import yarnSourcing from '@/assets/yarn-sourcing.png';
import garmentLinking from '@/assets/garment-linking.png';
import finishingQc from '@/assets/finishing-qc.png';
import fabrics from '@/assets/fabrics.png';

// 1. Impact Metrics Data
const IMPACT_METRICS = [
  {
    value: '95%',
    label: 'Water Recycling',
    icon: Droplet,
    description: 'Closed-loop biological ETP and Reverse Osmosis system treating & reusing 4,000m³/day.',
    color: 'from-emerald-500/20 to-teal-500/10',
    accent: 'text-emerald-400',
    border: 'border-emerald-500/30'
  },
  {
    value: '60%',
    label: 'Renewable Energy',
    icon: Sun,
    description: '2MW rooftop solar installation reducing grid dependency and eliminating 3,000T CO₂ annually.',
    color: 'from-amber-500/20 to-yellow-500/10',
    accent: 'text-amber-400',
    border: 'border-amber-500/30'
  },
  {
    value: 'Zero',
    label: 'Hazardous Discharge',
    icon: ShieldCheck,
    description: '100% ZDHC MRSL compliant chemicals with heavy-metal-free and Azo-free dye formulations.',
    color: 'from-blue-500/20 to-cyan-500/10',
    accent: 'text-blue-400',
    border: 'border-blue-500/30'
  },
  {
    value: '100%',
    label: 'Compliance Commitment',
    icon: Award,
    description: 'Rigorously audited by GOTS, OEKO-TEX, Sedex, and ISO regulatory frameworks.',
    color: 'from-emerald-500/20 to-green-500/10',
    accent: 'text-emerald-400',
    border: 'border-emerald-500/30'
  }
];

// 2. Sustainability Pillars Data
const SUSTAINABILITY_PILLARS = [
  {
    title: 'Responsible Material Sourcing',
    description: '100% traceable organic cotton, GOTS certified fibers, Recycled Polyester, and Responsible Wool Standard (RWS) certified Merino wool.',
    icon: Leaf,
    image: yarnSourcing,
    highlights: ['GOTS Organic Cotton', 'RWS Certified Wool', 'Recycled Yarns']
  },
  {
    title: 'Energy Efficient Manufacturing',
    description: 'High-efficiency Shima Seiki computerized knitting machines paired with smart inverter air systems and 2MW rooftop solar generation.',
    icon: Zap,
    image: greenFactory,
    highlights: ['2MW Rooftop Solar', '3,000T Annual CO₂ Cut', 'LED & Inverter Tech']
  },
  {
    title: 'Water Conservation',
    description: 'Closed-loop wastewater reclamation plant recovering 95% of water back into dyeing processes, safeguarding local groundwater ecosystems.',
    icon: Droplet,
    image: manufacturingHero,
    highlights: ['4,000 m³/day Capacity', 'Biological ETP', 'RO Filtration']
  },
  {
    title: 'Waste Reduction & Recycling',
    description: 'Circular fabric offcut management upcycling 90%+ of production waste into circular yarn stock or high-density insulation materials.',
    icon: Recycle,
    image: fabrics,
    highlights: ['Zero Landfill Goal', 'Offcut Upcycling', 'Closed-Loop Yarn']
  },
  {
    title: 'Ethical Workplace',
    description: 'Empowering over 2,500 skilled artisans with fair living wages, comprehensive healthcare, continuous skill advancement, and safe facilities.',
    icon: Users,
    image: garmentLinking,
    highlights: ['Fair Living Wage', 'Gender Equality', 'On-Site Medical Care']
  },
  {
    title: 'Quality & Compliance',
    description: 'Uncompromising standard operating procedures backed by continuous internal auditing and third-party global certifications.',
    icon: ShieldCheck,
    image: finishingQc,
    highlights: ['ISO 9001 Certified', 'OEKO-TEX 100', 'Sedex Audited']
  }
];

// 3. Timeline Milestones Data
const TIMELINE_MILESTONES = [
  {
    year: '2018',
    title: 'Responsible Material Adoption',
    description: 'Converted 100% of dye chemistry to Azo-free MRSL compliant standards and launched GOTS organic cotton product lines.'
  },
  {
    year: '2020',
    title: 'Energy Efficiency Programs',
    description: 'Commissioned 2MW rooftop solar photovoltaic array, supplying 60% of factory power needs from clean solar energy.'
  },
  {
    year: '2022',
    title: 'Water Recycling Initiatives',
    description: 'Deployed advanced biological ETP with multi-stage Reverse Osmosis filtration, achieving 95% water recovery.'
  },
  {
    year: '2024',
    title: 'Ethical & Zero-Landfill Manufacturing',
    description: 'Achieved 90%+ solid waste diversion rate and introduced circular fiber upcycling partnerships with international buyers.'
  },
  {
    year: '2026+',
    title: 'Net-Zero Carbon Horizon',
    description: 'Targeting complete carbon-neutral sweater production by 2030 through expanded solar storage and supply chain decarbonization.'
  }
];

// 4. Certifications Data
const CERTIFICATIONS = [
  {
    code: 'GOTS',
    title: 'Global Organic Textile Standard',
    category: 'Organic Fiber Integrity',
    desc: 'Worldwide leading textile processing standard for organic fibers, including ecological and social criteria.',
    color: 'emerald'
  },
  {
    code: 'OEKO-TEX®',
    title: 'Standard 100 Certified',
    category: 'Chemical Safety',
    desc: 'Guarantees every component, yarn, and accessory is tested and certified free from harmful substances.',
    color: 'teal'
  },
  {
    code: 'Sedex',
    title: 'SMETA Social Compliance',
    category: 'Ethical Sourcing',
    desc: 'Comprehensive audit methodology assessing labor standards, health & safety, environment, and business ethics.',
    color: 'blue'
  },
  {
    code: 'GSCS',
    title: 'Global Sustainability & Compliance',
    category: 'Environmental Management',
    desc: 'Independent verification of facility environmental performance, energy efficiency, and chemical management.',
    color: 'green'
  },
  {
    code: 'ASCB',
    title: 'Accreditation Service for Certifying Bodies',
    category: 'International Governance',
    desc: 'Ensures quality management, environmental governance, and compliance systems meet international benchmarks.',
    color: 'indigo'
  }
];

export function Sustainability() {
  return (
    <div className="w-full font-sans bg-zinc-950 text-white overflow-hidden selection:bg-emerald-500 selection:text-black">
      
      {/* ────────────────────────────────────────
          1. HERO SECTION
         ──────────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-20 overflow-hidden">
        {/* Background image with subtle parallax feel */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center scale-105 transform transition-transform duration-1000 ease-out"
          style={{ backgroundImage: `url(${greenFactory})` }}
        />
        
        {/* Gradients & Dark Overlays */}
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/75 to-zinc-950" />
        <div className="absolute inset-0 z-0 bg-radial-at-c from-emerald-950/30 via-transparent to-transparent opacity-60" />

        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-5xl">
          {/* Label Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-8 backdrop-blur-md"
          >
            <Leaf className="w-3.5 h-3.5 text-emerald-400" />
            <span>Sustainability</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-8 text-white max-w-4xl mx-auto"
          >
            Sustainable Manufacturing <br className="hidden md:inline" />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-green-400 bg-clip-text text-transparent">
              for a Better Tomorrow
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed mb-12 font-normal"
          >
            At Al-Amin Export Ltd., sustainability is engineered into every stitch. We combine responsible sweater manufacturing, ethical sourcing, environmental stewardship, energy efficiency, and unyielding global compliance to pioneer long-term sustainability in international fashion supply chains.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a href="#pillars">
              <Button size="lg" className="rounded-full bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-semibold px-8 py-6 flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105">
                Our Pillars <ArrowRight className="w-4 h-4" />
              </Button>
            </a>
            <a href="#facility">
              <Button size="lg" variant="outline" className="rounded-full border-zinc-700 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-200 font-medium px-8 py-6 backdrop-blur-md transition-all">
                Explore ETP Facility
              </Button>
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-zinc-500 text-xs font-mono uppercase tracking-widest"
        >
          <span>Scroll to explore</span>
          <ChevronDown className="w-4 h-4 text-emerald-400 animate-bounce" />
        </motion.div>
      </section>

      {/* ────────────────────────────────────────
          2. IMPACT METRICS
         ──────────────────────────────────────── */}
      <section className="py-16 md:py-20 relative bg-zinc-900/50 border-y border-zinc-800/80">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {IMPACT_METRICS.map((metric, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative rounded-2xl bg-zinc-900/80 border ${metric.border} p-8 backdrop-blur-md hover:border-emerald-500/50 transition-all duration-300 group hover:-translate-y-1 shadow-lg`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${metric.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <metric.icon className={`w-6 h-6 ${metric.accent}`} />
                </div>
                
                <h3 className={`text-4xl md:text-5xl font-extrabold ${metric.accent} tracking-tight mb-2 font-mono`}>
                  {metric.value}
                </h3>
                
                <p className="text-sm font-semibold uppercase tracking-wider text-zinc-200 mb-3">
                  {metric.label}
                </p>
                
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {metric.description}
                </p>

                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-emerald-500/40 group-hover:bg-emerald-400 transition-colors" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────
          3. SUSTAINABILITY PILLARS
         ──────────────────────────────────────── */}
      <section id="pillars" className="py-24 relative bg-zinc-950">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-emerald-400 font-semibold text-xs uppercase tracking-widest block mb-3">
              Strategic Framework
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Our Sustainability Pillars
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Engineered with world-class environmental, social, and quality standards to provide complete transparency for international fashion brands.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SUSTAINABILITY_PILLARS.map((pillar, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="group relative bg-zinc-900/60 rounded-2xl overflow-hidden border border-zinc-800/80 hover:border-emerald-500/40 transition-all duration-300 flex flex-col shadow-xl"
              >
                {/* Image Container */}
                <div className="relative h-56 w-full overflow-hidden">
                  <img
                    src={pillar.image}
                    alt={pillar.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
                  
                  {/* Icon Badge */}
                  <div className="absolute bottom-4 left-6 w-12 h-12 rounded-xl bg-zinc-900/90 border border-emerald-500/30 text-emerald-400 flex items-center justify-center backdrop-blur-md shadow-md">
                    <pillar.icon className="w-6 h-6" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-400 transition-colors">
                      {pillar.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                      {pillar.description}
                    </p>
                  </div>

                  {/* Bullet Highlights */}
                  <div className="pt-4 border-t border-zinc-800/80 space-y-2">
                    {pillar.highlights.map((h, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2 text-xs text-zinc-300">
                        <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────
          4. FEATURED FACILITY (Biological ETP)
         ──────────────────────────────────────── */}
      <section id="facility" className="py-24 relative bg-zinc-900/30 border-y border-zinc-800/80">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Image Spotlight */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6 relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-zinc-800 group">
                <img
                  src={manufacturingHero}
                  alt="Biological Effluent Treatment Plant"
                  className="w-full h-[520px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                {/* Floating Metric Card Overlay */}
                <div className="absolute bottom-6 left-6 right-6 p-6 rounded-2xl bg-zinc-900/90 border border-emerald-500/30 backdrop-blur-xl shadow-2xl flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                      <Droplet className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">Treatment Capacity</p>
                      <p className="text-2xl font-bold font-mono text-white">4,000 m³/day</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      95% Reclaimed
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Content Panel */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="lg:col-span-6 space-y-8"
            >
              <div>
                <span className="text-emerald-400 font-bold text-xs uppercase tracking-widest block mb-3">
                  Facility Spotlight
                </span>
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
                  Biological Effluent Treatment Plant (ETP)
                </h2>
                <p className="text-zinc-300 text-lg leading-relaxed mb-6">
                  Our state-of-the-art biological Effluent Treatment Plant processes up to 4,000 cubic meters of industrial wastewater daily. Operating with advanced reverse osmosis membrane technology, we recover and recirculate 95% of water back into our dyeing processes, leaving the remaining discharge pure enough to sustain local aquatic ecosystems.
                </p>
              </div>

              {/* Animated Quick Stats */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                  <p className="text-xs text-zinc-400 uppercase tracking-widest font-semibold mb-1">Water Recovery</p>
                  <p className="text-3xl font-extrabold text-emerald-400 font-mono">95%</p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800">
                  <p className="text-xs text-zinc-400 uppercase tracking-widest font-semibold mb-1">Daily Volume</p>
                  <p className="text-3xl font-extrabold text-emerald-400 font-mono">4,000 m³</p>
                </div>
              </div>

              {/* Feature Bullets */}
              <div className="grid grid-cols-2 gap-4 border-t border-zinc-800/80 pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm text-zinc-200 font-medium">Water Recycling</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm text-zinc-200 font-medium">Energy Optimization</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm text-zinc-200 font-medium">Waste Reduction</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm text-zinc-200 font-medium">Continuous Monitoring</span>
                </div>
              </div>

            </motion.div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────
          5. ENVIRONMENTAL COMMITMENT TIMELINE
         ──────────────────────────────────────── */}
      <section className="py-24 relative bg-zinc-950">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-emerald-400 font-semibold text-xs uppercase tracking-widest block mb-3">
              Progress & Roadmap
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Our Sustainability Journey
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              A decade of intentional investment in clean energy, closed-loop water treatment, and ethical manufacturing.
            </p>
          </div>

          <div className="max-w-4xl mx-auto relative">
            {/* Center Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-500 via-teal-500 to-zinc-800 transform md:-translate-x-1/2" />

            <div className="space-y-12">
              {TIMELINE_MILESTONES.map((item, i) => {
                const isEven = i % 2 === 0;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    className={`relative flex flex-col md:flex-row items-start ${
                      isEven ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Glowing Node Marker */}
                    <div className="absolute left-4 md:left-1/2 top-1.5 -translate-x-1/2 z-10 w-8 h-8 rounded-full bg-zinc-950 border-2 border-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    </div>

                    {/* Timeline Content Card */}
                    <div className={`ml-12 md:ml-0 md:w-1/2 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}>
                      <div className="p-8 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 hover:border-emerald-500/40 transition-all duration-300 shadow-xl group">
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-3">
                          {item.year}
                        </span>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────
          6. CERTIFICATIONS
         ──────────────────────────────────────── */}
      <section className="py-24 relative bg-zinc-900/40 border-t border-zinc-800/80">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-emerald-400 font-semibold text-xs uppercase tracking-widest block mb-3">
              Independent Audits
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
              International Standards
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Our processes and facilities undergo stringent annual third-party verification to assure international buyers of our environmental, social, and quality compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CERTIFICATIONS.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-zinc-900/80 p-8 rounded-2xl border border-zinc-800/80 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-extrabold font-mono text-emerald-400 tracking-wider">
                      {cert.code}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded bg-zinc-800 text-zinc-400">
                      {cert.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-zinc-400 text-xs leading-relaxed mb-6">
                    {cert.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                  <span className="text-emerald-400/80 font-medium flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Audit Verified
                  </span>
                  <Link to="/certifications" className="text-zinc-400 hover:text-white transition-colors font-medium flex items-center gap-1">
                    Details <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────
          7. GLOBAL IMPACT SECTION
         ──────────────────────────────────────── */}
      <section className="relative py-28 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-40 mix-blend-luminosity"
          style={{ backgroundImage: `url(${greenFactory})` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-zinc-950 via-zinc-950/90 to-zinc-950" />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-emerald-400 font-semibold text-xs uppercase tracking-widest block mb-3">
              Beyond Compliance
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">
              Our Commitment Beyond Manufacturing
            </h2>
            <p className="text-zinc-300 text-lg leading-relaxed">
              We view sustainability as a catalyst for long-term industrial modernization, social equity, and planetary preservation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="p-8 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 backdrop-blur-md text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-6">
                <TreePine className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Lower Carbon Footprint</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Decarbonizing knitwear manufacturing through on-site solar generation, waste heat recovery, and high-efficiency machinery.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="p-8 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 backdrop-blur-md text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-6">
                <Droplet className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Responsible Resource Management</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Protecting aquatic ecosystems with closed-loop water treatment, zero toxic discharges, and non-hazardous dye chemistries.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="p-8 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 backdrop-blur-md text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Long-Term Sustainable Growth</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Empowering textile workers, investing in community development, and driving circular economy innovation for fashion leaders.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ────────────────────────────────────────
          8. CALL TO ACTION (CTA)
         ──────────────────────────────────────── */}
      <section className="py-24 relative bg-zinc-950 border-t border-zinc-800/80">
        <div className="container mx-auto px-4 md:px-8">
          <div className="relative rounded-3xl overflow-hidden p-10 md:p-20 bg-gradient-to-br from-zinc-900 via-zinc-900/90 to-emerald-950/40 border border-emerald-500/30 text-center max-w-5xl mx-auto shadow-2xl">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <span className="text-emerald-400 font-semibold text-xs uppercase tracking-widest block mb-4">
                Partner With Us
              </span>
              
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 leading-tight">
                Building a Sustainable Future Together
              </h2>
              
              <p className="text-zinc-300 text-lg leading-relaxed mb-10">
                Join international fashion brands that trust Al-Amin Export Ltd. for high-precision sweater production, zero-compromise compliance, and audited eco-friendly manufacturing.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link to="/capabilities">
                  <Button size="lg" className="rounded-full bg-emerald-500 hover:bg-emerald-600 text-zinc-950 font-semibold px-8 py-6 flex items-center gap-2 shadow-lg shadow-emerald-500/20 transition-all hover:scale-105">
                    Explore Capabilities <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" variant="outline" className="rounded-full border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800 text-white font-medium px-8 py-6 backdrop-blur-md transition-all">
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
