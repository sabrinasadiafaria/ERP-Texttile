import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { 
  Building2, 
  Users, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Layers
} from 'lucide-react';
import manufacturingHero from '@/assets/manufacturing-hero.jpg';

const CORE_VALUES = [
  {
    title: 'Precision Engineering',
    desc: 'Combining Shima Seiki computerized knitting CAD systems with artisanal linking to deliver millimeter-exact garment construction.',
    icon: Layers
  },
  {
    title: 'Ethical Integrity',
    desc: 'Empowering over 5,000 skilled workers with fair living wages, healthcare, safe facilities, and continuous skills training.',
    icon: Users
  },
  {
    title: 'Environmental Stewardship',
    desc: 'Operating solar-powered facilities and a 4,000 m³/day biological water treatment plant that reclaims 95% of process water.',
    icon: Zap
  },
  {
    title: 'Global Compliance',
    desc: 'Independently audited and certified by GOTS, OEKO-TEX Standard 100, Sedex SMETA, BSCI, and ISO 9001.',
    icon: ShieldCheck
  }
];

const MILESTONES = [
  { year: '2002', title: 'Inception', desc: 'Established as a boutique export sewing house specializing in high-end European fashion labels.' },
  { year: '2008', title: 'Industrial Expansion', desc: 'Invested in automated Japanese Shima Seiki flat-bed knitting machinery, quadrupling capacity.' },
  { year: '2016', title: 'Vertical Integration', desc: 'Built dedicated dyehouse, testing lab, and biological Effluent Treatment Plant (ETP).' },
  { year: '2020', title: 'Green Energy Transition', desc: 'Installed 2MW rooftop solar array, reducing factory grid carbon emissions by 3,000 tons annually.' },
  { year: '2024+', title: 'Digital & Circular Future', desc: 'Pioneering zero-waste fabric recycling and ERP-driven smart factory operations for global buyers.' }
];

export function About() {
  return (
    <div className="w-full font-sans bg-zinc-950 text-white overflow-hidden selection:bg-[#0047ff] selection:text-white">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-28 pb-20 overflow-hidden">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-40 scale-105"
          style={{ backgroundImage: `url(${manufacturingHero})` }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-zinc-950/80 via-zinc-950/75 to-zinc-950" />

        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-[#4d79ff] text-xs font-semibold uppercase tracking-widest mb-8 backdrop-blur-md"
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>About Al-Amin Export Ltd.</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-8 text-white"
          >
            Crafting the Future of <br className="hidden md:inline" />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-400 bg-clip-text text-transparent">
              Global Apparel Production
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed mb-12"
          >
            Al-Amin Export Ltd. is a 100% export-oriented premium sweater and knitwear manufacturer. We bridge advanced Japanese engineering with skilled craftsmanship to power the world's leading fashion retail brands.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <Link to="/capabilities">
              <Button size="lg" className="rounded-full bg-[#0047ff] hover:bg-[#0038cc] text-white font-semibold px-8 py-6 flex items-center gap-2 shadow-lg shadow-blue-500/20">
                Our Capabilities <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="rounded-full border-zinc-700 bg-zinc-900/60 hover:bg-zinc-800 text-zinc-200 font-medium px-8 py-6 backdrop-blur-md">
                Get in Touch
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. Key Metrics Bar */}
      <section className="py-16 bg-zinc-900/60 border-y border-zinc-800/80 backdrop-blur-md">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 md:px-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-zinc-800/60">
            <div className="p-4">
              <p className="text-4xl md:text-5xl font-extrabold text-[#4d79ff] font-mono mb-2">25+</p>
              <p className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">Years Experience</p>
            </div>
            <div className="p-4">
              <p className="text-4xl md:text-5xl font-extrabold text-[#4d79ff] font-mono mb-2">5,000+</p>
              <p className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">Skilled Artisans</p>
            </div>
            <div className="p-4">
              <p className="text-4xl md:text-5xl font-extrabold text-[#4d79ff] font-mono mb-2">20M+</p>
              <p className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">Annual Garment Volume</p>
            </div>
            <div className="p-4">
              <p className="text-4xl md:text-5xl font-extrabold text-[#4d79ff] font-mono mb-2">45+</p>
              <p className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">Export Countries</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 3. Our Values */}
      <section className="py-24 bg-zinc-950">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#4d79ff] font-semibold text-xs uppercase tracking-widest block mb-3">Our Core Philosophy</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6">Engineered for Global Leadership</h2>
            <p className="text-zinc-400 text-lg leading-relaxed">
              We operate under a rigid zero-defect mandate, ensuring every shipment meets international retail expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CORE_VALUES.map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="p-8 rounded-2xl bg-zinc-900/70 border border-zinc-800/80 hover:border-[#0047ff]/40 transition-all duration-300 group shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-[#4d79ff] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <val.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#4d79ff] transition-colors">{val.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Heritage Timeline */}
      <section className="py-24 bg-zinc-900/30 border-t border-zinc-800/80">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="text-center mb-16">
            <span className="text-[#4d79ff] font-semibold text-xs uppercase tracking-widest block mb-3">Our Legacy</span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white">Over Two Decades of Growth</h2>
          </div>

          <div className="space-y-8">
            {MILESTONES.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 rounded-2xl bg-zinc-900/80 border border-zinc-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-zinc-700 transition-colors shadow-md"
              >
                <div className="flex items-center gap-6">
                  <span className="text-3xl font-extrabold text-[#4d79ff] font-mono px-4 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    {m.year}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-white">{m.title}</h3>
                    <p className="text-zinc-400 text-sm mt-1">{m.desc}</p>
                  </div>
                </div>
                <CheckCircle2 className="w-6 h-6 text-blue-400 shrink-0 hidden md:block" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA Banner */}
      <section className="py-24 bg-zinc-950 border-t border-zinc-800/80">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <div className="p-12 md:p-16 rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-900 to-blue-950/40 border border-blue-500/20 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to Partner with Al-Amin Export?</h2>
            <p className="text-zinc-300 text-base md:text-lg mb-8 max-w-xl mx-auto">
              Get in touch with our executive team to explore custom sweater production, sampling, or supply chain partnerships.
            </p>
            <Link to="/contact">
              <Button size="lg" className="rounded-full bg-[#0047ff] hover:bg-[#0038cc] text-white font-bold px-8 py-6 shadow-lg shadow-blue-500/20">
                Contact Executive Team
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
