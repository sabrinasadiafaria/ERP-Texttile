import { motion } from 'framer-motion';
import manufacturingHero from '@/assets/manufacturing-hero.jpg';
import { ArrowRight, PenTool, Layers, Settings, Scissors, ShieldCheck, Globe } from 'lucide-react';

const CAPABILITIES = [
  {
    title: 'Design & Sampling',
    desc: 'In-house design team using Shima Seiki Apex CAD system. Sample development from sketches, tech packs, images, or swatches with ~7-day lead time.',
    icon: PenTool,
  },
  {
    title: 'Knitting Department',
    desc: 'Japanese Shima Seiki flat-bed fully-fashioned machines (14 to 5 Gauge). Monthly knitting capacity ~170,000 pieces across fine and chunky gauges.',
    icon: Settings,
  },
  {
    title: 'Manufacturing & Structures',
    desc: 'Specialized in Cable, Jacquard, and Intarsia knitting structures across fine 14/12/10 Gauge to 5 Gauge Chunky sweaters and cardigans.',
    icon: Layers,
  },
  {
    title: 'Finishing (9-Step QA)',
    desc: 'Rigorous 9-step quality inspection: panel checks, fabric QA table, certified detergent washing, linking assembly, hand finishing, steam pressing & final exam.',
    icon: ShieldCheck,
  },
  {
    title: 'Embroidery & Customization',
    desc: 'Custom digitized swatches produced within 5–10 working days with Pantone color matching and placement options. Includes 2 free revisions.',
    icon: Scissors,
  },
  {
    title: 'Yarn Sourcing & Compliance',
    desc: 'Sourcing 100% Combed Cotton, Organic Cotton, Italian Merino, Lambswool, Cashmere, Viscose, and Acrylic under Sedex & GOTS compliance.',
    icon: Globe,
  }
];

export function Capabilities() {
  return (
    <div className="w-full font-sans bg-white pt-24 pb-0 overflow-hidden">
      
      {/* 1. Hero Section */}
      <section className="bg-white py-16 md:py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 md:px-8 text-center max-w-4xl"
        >
          <span className="text-[#0047ff] font-bold text-xs uppercase tracking-widest block mb-6">Vertical Integration</span>
          <h1 className="text-5xl md:text-7xl font-bold text-black leading-[1.1] mb-8">
            End-to-End Manufacturing Capabilities
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed mb-12">
            Integrated sweater manufacturing, precision knitting, premium yarn sourcing, uncompromising quality assurance, and seamless global exports.
          </p>
        </motion.div>
      </section>

      {/* 2. Hero Image Banner */}
      <section className="container mx-auto px-4 md:px-8 pb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full h-[600px] rounded-3xl overflow-hidden relative shadow-2xl group"
        >
          <img src={manufacturingHero} alt="Manufacturing Floor" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
             <div className="text-white">
                <p className="text-sm font-bold uppercase tracking-widest text-white/80 mb-2 font-mono">Facility Overview</p>
                <h3 className="text-3xl md:text-4xl font-bold max-w-xl">World-Class Export-Oriented Knitwear Manufacturing</h3>
             </div>
          </div>
        </motion.div>
      </section>

      {/* 3. Core Capabilities Grid */}
      <section className="py-24 bg-[#f8f9fa] border-t border-gray-200">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black max-w-md">Our Manufacturing Excellence</h2>
            <p className="text-gray-500 max-w-sm text-right hidden md:block leading-relaxed">
              Equipped with latest-generation Shima Seiki technology and driven by highly skilled craftsmanship.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {CAPABILITIES.map((cap, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="flex flex-col relative group cursor-pointer"
              >
                <div className="w-16 h-16 rounded-xl bg-white shadow-md border border-gray-100 flex items-center justify-center text-[#0047ff] mb-6 group-hover:scale-110 group-hover:bg-[#0047ff] group-hover:text-white transition-all duration-300">
                  <cap.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-black mb-4 group-hover:text-[#0047ff] transition-colors">{cap.title}</h3>
                <p className="text-gray-500 leading-relaxed">{cap.desc}</p>
                <div className="mt-6 flex items-center text-[#0047ff] font-bold text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                  Explore <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Statistics & Yarn Capabilities */}
      <section className="py-24 bg-white relative border-t border-gray-100">
         <div className="container mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
               <motion.div 
                 initial={{ opacity: 0, x: -30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.7 }}
                 className="flex flex-col justify-center"
               >
                  <p className="text-[#0047ff] font-bold text-xs uppercase tracking-widest mb-6">By The Numbers</p>
                  <h2 className="text-4xl md:text-5xl font-bold mb-10 text-black">Precision at Scale</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                    <div className="border-l-2 border-[#0047ff] pl-4">
                      <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Established</span>
                      <p className="text-2xl font-bold text-black mt-1 font-mono">2002</p>
                    </div>
                    <div className="border-l-2 border-[#0047ff] pl-4">
                      <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Manufacturing Type</span>
                      <p className="text-2xl font-bold text-black mt-1">100% Export-Oriented</p>
                    </div>
                    <div className="border-l-2 border-[#0047ff] pl-4">
                      <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Knitting Technology</span>
                      <p className="text-2xl font-bold text-black mt-1">Shima Seiki Flat-Bed</p>
                    </div>
                    <div className="border-l-2 border-[#0047ff] pl-4">
                      <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Gauge Range</span>
                      <p className="text-2xl font-bold text-black mt-1 font-mono">5 / 7 / 10 / 12 / 14 G</p>
                    </div>
                    <div className="border-l-2 border-[#0047ff] pl-4">
                      <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Sampling</span>
                      <p className="text-2xl font-bold text-black mt-1">In-house CAD Design</p>
                    </div>
                    <div className="border-l-2 border-[#0047ff] pl-4">
                      <span className="text-gray-400 font-bold uppercase tracking-widest text-[10px]">Monthly Capacity</span>
                      <p className="text-2xl font-bold text-black mt-1 font-mono">170,000+ Pieces</p>
                    </div>
                  </div>
               </motion.div>
               
               <motion.div 
                 initial={{ opacity: 0, x: 30 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.7 }}
                 className="bg-[#f8f9fa] rounded-3xl p-10 md:p-14 flex flex-col justify-center border border-gray-100 shadow-sm"
               >
                  <h3 className="text-2xl font-bold text-black mb-6">Premium Yarn Capabilities</h3>
                  <p className="text-gray-500 mb-8 leading-relaxed">We source and process the finest natural and synthetic blends to meet exact buyer specifications and international retail standards.</p>
                  <div className="flex flex-wrap gap-3">
                     {['Organic Cotton', 'Merino Wool', 'Lambswool', 'Cashmere', 'Viscose', 'Acrylic', 'Cotton Blends'].map(yarn => (
                       <motion.span 
                         key={yarn} 
                         whileHover={{ scale: 1.05, y: -2 }}
                         className="bg-white border border-gray-200 shadow-sm text-black font-semibold text-sm px-5 py-2.5 rounded-full hover:border-black transition-colors cursor-default"
                       >
                         {yarn}
                       </motion.span>
                     ))}
                  </div>
               </motion.div>
            </div>
         </div>
      </section>

      {/* 5. International Standards & Compliance */}
      <section className="py-24 bg-[#0a1128] text-white">
         <div className="container mx-auto px-4 md:px-8 text-center">
            <p className="text-[#4d79ff] font-bold text-xs uppercase tracking-widest mb-6">Global Recognition</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-8">International Standards & Compliance</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed mb-16">
              Every garment we produce is manufactured under internationally recognized quality, ethical sourcing, and sustainability standards, ensuring absolute compliance for global retail brands.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
               {['Sedex', 'GOTS', 'Organic 100', 'GSCS', 'ASCB'].map((cert, idx) => (
                 <motion.div 
                   key={cert} 
                   initial={{ opacity: 0, scale: 0.9 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   transition={{ duration: 0.4, delay: idx * 0.08 }}
                   whileHover={{ scale: 1.08, y: -4 }}
                   className="bg-white/5 border border-white/10 rounded-2xl p-8 flex items-center justify-center w-40 h-40 hover:bg-white/10 transition-all duration-300 backdrop-blur-sm cursor-default"
                 >
                   <span className="font-bold text-xl text-white text-center font-mono">{cert}</span>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>
      
    </div>
  );
}
