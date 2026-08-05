import { motion } from 'framer-motion';
import { ShieldCheck, FileText, Globe2, Award, Download, CheckCircle2, Lock, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// Asset Images (same style as Sustainability page)
import finishingQc from '@/assets/finishing-qc.png';
import greenFactory from '@/assets/green-factory.jpg';
import exportPackaging from '@/assets/export-packaging.png';
import yarnSourcing from '@/assets/yarn-sourcing.png';

const CERTIFICATIONS = [
  {
    title: 'Sedex SMETA Audit',
    category: 'Ethical Trade & Social Compliance',
    code: 'SEDEX-BD-2002',
    desc: 'Independently audited social compliance empowering ethical supply chains across labor rights, worker health & safety, environmental standards, and business ethics.',
    valid: 'Fully Certified',
    badgeColor: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400',
    icon: ShieldCheck,
    image: finishingQc,
    tag: 'Social Compliance Audit'
  },
  {
    title: 'GSCS (Global Sustainable)',
    category: 'Third-Party Verification',
    desc: 'Verified by Global Sustainable Certification Services (GSCS) confirming eco-friendly textile processing, chemical management, and sustainable manufacturing.',
    code: 'GSCS-CERT-884',
    valid: 'Fully Certified',
    badgeColor: 'bg-blue-500/20 border-blue-500/40 text-blue-400',
    icon: Award,
    image: greenFactory,
    tag: 'Environmental Audit'
  },
  {
    title: 'ASCB Accreditation',
    category: 'Quality Management Standards',
    desc: 'Accreditation Service for Certifying Bodies validation ensuring standardized quality management systems across all sweater production lines.',
    code: 'ASCB-QMS-104',
    valid: 'Fully Certified',
    badgeColor: 'bg-indigo-500/20 border-indigo-500/40 text-indigo-400',
    icon: FileText,
    image: exportPackaging,
    tag: 'Quality Standard'
  },
  {
    title: 'Organic 100 Content Standard',
    category: 'Material Certification',
    desc: 'Certified tracking of 100% organic cotton fibers from raw material sourcing to finished garments, guaranteeing zero chemical adulteration.',
    code: 'OCS-100-TEXTILE',
    valid: 'Fully Certified',
    badgeColor: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400',
    icon: Globe2,
    image: yarnSourcing,
    tag: '100% Organic Content'
  },
  {
    title: 'GOTS (Global Organic Textile Standard)',
    category: 'Organic Integrity & Social Criteria',
    desc: 'The world’s leading processing standard for organic knitwear, auditing environmental impact, non-toxic dyes, and social criteria throughout production.',
    code: 'GOTS-ORG-2026',
    valid: 'Fully Certified',
    badgeColor: 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400',
    icon: Globe2,
    image: greenFactory,
    tag: 'Global Organic Standard'
  }
];

export function Certifications() {
  return (
    <div className="w-full font-sans bg-zinc-950 text-white min-h-screen pt-28 pb-24 overflow-hidden selection:bg-[#0047ff] selection:text-white relative">
      
      {/* Ambient background glow circles */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-10 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* 1. Hero Section */}
      <section className="relative z-10 py-12 md:py-16">
        <motion.div 
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="container mx-auto px-4 md:px-8 max-w-5xl text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-[#4d79ff] text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-[#4d79ff]" />
            <span>Audited & Certified Excellence</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-8 text-white">
            Global Compliance & <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-400 bg-clip-text text-transparent">
              Independent Certifications
            </span>
          </h1>

          <p className="text-lg md:text-xl text-zinc-300 leading-relaxed max-w-3xl mx-auto mb-10 font-normal">
            Transparency is the foundation of global trade. Al-Amin Export Ltd. operates under rigorous third-party auditing to guarantee ethical labor, organic integrity, and zero-defect quality for international fashion buyers.
          </p>

          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
            <Button size="lg" className="rounded-full bg-[#0047ff] hover:bg-[#0038cc] text-white font-semibold px-8 py-6 flex items-center gap-3 shadow-xl shadow-blue-500/20">
              <Download className="w-5 h-5" /> Download Full Audit Report (PDF)
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. Featured Image Pillar Section (Styled exactly like Sustainability Page) */}
      <section className="relative z-10 py-10">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid lg:grid-cols-12 gap-8 items-center bg-zinc-900/90 rounded-3xl p-8 md:p-12 border border-zinc-800 shadow-2xl backdrop-blur-md"
          >
            <div className="lg:col-span-6 flex flex-col space-y-6">
              <span className="text-[#4d79ff] text-xs font-semibold uppercase tracking-widest font-mono">
                Audited Quality Control Facility
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                Rigorous In-House & Independent Inspections
              </h2>
              <p className="text-zinc-400 text-base leading-relaxed">
                Our plant in Narayanganj undergoes continuous social and environmental audits. From panel inspection right off Shima Seiki machines to certified detergent washing and final measurement checks, we ensure 100% compliance with buyer specifications.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800">
                  <span className="text-2xl font-bold text-[#4d79ff] font-mono">100%</span>
                  <p className="text-xs text-zinc-400 font-medium mt-1">Zero Hazardous Chemical Discharge</p>
                </div>
                <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800">
                  <span className="text-2xl font-bold text-[#4d79ff] font-mono">Daily</span>
                  <p className="text-xs text-zinc-400 font-medium mt-1">Internal Safety Audits</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-2xl border border-zinc-700/60 group"
              >
                <img 
                  src={finishingQc} 
                  alt="Quality Control & Audit Facility" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4 px-3 py-1 bg-black/70 backdrop-blur-md rounded-full text-xs font-mono font-bold text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Certified Inspection Unit
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="text-sm font-bold">Narayanganj Composite Quality Control Lab</p>
                  <p className="text-xs text-zinc-300">Audited under Sedex SMETA & GOTS standards</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Certifications Grid with Feature Images */}
      <section className="relative z-10 py-12">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-[#4d79ff] font-semibold text-xs uppercase tracking-widest block mb-2 font-mono">
              Accreditation Portfolio
            </span>
            <h2 className="text-3xl font-bold text-white">Audited Standards & Certifications</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CERTIFICATIONS.map((cert, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-zinc-900/90 rounded-3xl border border-zinc-800/90 hover:border-[#0047ff]/50 shadow-xl transition-all duration-300 relative overflow-hidden group flex flex-col justify-between backdrop-blur-md"
              >
                {/* Image Header Card (matching Sustainability aesthetic) */}
                <div className="relative aspect-[16/10] overflow-hidden w-full">
                  <img 
                    src={cert.image} 
                    alt={cert.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
                  
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[11px] font-mono font-bold text-white border border-white/10">
                    {cert.tag}
                  </div>

                  <div className="absolute bottom-3 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${cert.badgeColor} flex items-center gap-1.5 backdrop-blur-md`}>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {cert.valid}
                    </span>
                  </div>
                </div>

                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-500/10 text-[#4d79ff] rounded-xl border border-blue-500/20 flex items-center justify-center shrink-0">
                        <cert.icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-semibold tracking-wider uppercase text-zinc-400 font-mono">
                        {cert.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#4d79ff] transition-colors leading-tight">
                      {cert.title}
                    </h3>
                    
                    <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                      {cert.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500 block font-mono">
                        Audit Code
                      </span>
                      <span className="text-xs font-mono font-bold text-zinc-300">
                        {cert.code}
                      </span>
                    </div>

                    <button className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#4d79ff] hover:text-white transition-colors group/btn">
                      <span>View Standard</span>
                      <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Assurance & Continuous Monitoring Section */}
      <section className="relative z-10 py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-10 md:p-14 rounded-3xl bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-zinc-800 shadow-2xl flex flex-col items-center text-center backdrop-blur-md relative overflow-hidden"
          >
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-[#4d79ff] flex items-center justify-center mb-6">
              <Lock className="w-8 h-8" />
            </div>

            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Continuous Compliance & Daily Audits
            </h3>

            <p className="text-zinc-400 text-base md:text-lg max-w-2xl leading-relaxed mb-8">
              Our dedicated in-house compliance officers carry out daily environmental and social safety checks alongside annual third-party inspections to maintain zero-tolerance standards for global buyers.
            </p>

            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-zinc-900 border border-zinc-800 font-mono text-sm font-semibold text-zinc-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Direct Compliance Inquiry: <span className="text-[#4d79ff]">info@alaminexport.com</span>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
