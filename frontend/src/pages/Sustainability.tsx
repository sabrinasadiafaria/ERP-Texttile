import heroImage from '@/assets/hero.png';
import { Leaf, Droplet, Sun, Recycle } from 'lucide-react';

const INITIATIVES = [
  {
    title: 'Zero Discharge of Hazardous Chemicals',
    desc: 'Committed to ZDHC MRSL guidelines. 100% of our dyes are heavy-metal free and Azo compliant.',
    icon: Droplet,
  },
  {
    title: 'Renewable Energy Integration',
    desc: '60% of our power is generated via our 2MW rooftop solar installation, cutting 3,000 tons of CO2 annually.',
    icon: Sun,
  },
  {
    title: 'Circular Waste Management',
    desc: '90% of fabric offcuts are repurposed into recycled yarn or donated for downcycling into industrial insulation.',
    icon: Recycle,
  },
  {
    title: 'Traceable Organic Fibers',
    desc: 'GOTS certified supply chain ensuring our cotton is grown without synthetic pesticides or fertilizers.',
    icon: Leaf,
  }
];

export function Sustainability() {
  return (
    <div className="w-full font-sans bg-[#0a0a0a] pt-24 pb-0 text-white">
      
      {/* 1. Hero Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#07593c]/20 z-0" />
        <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl relative z-10">
          <p className="text-[#33cc80] font-bold text-xs uppercase tracking-widest mb-6">Our Commitment</p>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-8 text-white">
            Manufacturing with a Conscience
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed mb-12">
            Sustainability isn't a department; it's our operating system. We are systematically dismantling the linear "take-make-dispose" model in favor of a restorative, circular supply chain.
          </p>
        </div>
      </section>

      {/* 2. Impact Metrics */}
      <section className="bg-[#111111] py-16 border-y border-white/10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="py-4">
              <span className="block text-5xl font-bold text-[#33cc80] mb-2">95%</span>
              <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Water Recycled</span>
            </div>
            <div className="py-4">
              <span className="block text-5xl font-bold text-[#33cc80] mb-2">60%</span>
              <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Solar Powered</span>
            </div>
            <div className="py-4">
              <span className="block text-5xl font-bold text-[#33cc80] mb-2">1M+</span>
              <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Trees Planted</span>
            </div>
            <div className="py-4">
              <span className="block text-5xl font-bold text-[#33cc80] mb-2">0</span>
              <span className="text-xs uppercase tracking-widest text-gray-500 font-semibold">Waste to Landfill</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Core Initiatives Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Strategic Initiatives</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {INITIATIVES.map((init, i) => (
              <div key={i} className="bg-[#1a1a1a] p-12 rounded-2xl border border-white/5 hover:border-[#33cc80]/30 transition-colors">
                <div className="w-16 h-16 rounded-xl bg-[#07593c]/30 text-[#33cc80] flex items-center justify-center mb-8">
                  <init.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{init.title}</h3>
                <p className="text-gray-400 leading-relaxed text-lg">{init.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Effluent Treatment Plant */}
      <section className="py-0 relative bg-black">
         <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative min-h-[500px]">
               <img src={heroImage} alt="Water Treatment" className="absolute inset-0 w-full h-full object-cover opacity-80" />
            </div>
            <div className="p-12 md:p-24 flex flex-col justify-center bg-[#07593c] text-white">
               <p className="text-green-300 font-bold text-xs uppercase tracking-widest mb-6">Facility Spotlight</p>
               <h2 className="text-4xl md:text-5xl font-bold mb-8">Biological ETP</h2>
               <p className="text-white/80 text-lg leading-relaxed mb-12">
                 Our biological Effluent Treatment Plant treats 4,000 cubic meters of wastewater daily. Through advanced reverse osmosis, we recover and reuse 95% of the water back into our dyeing processes, leaving the remaining 5% clean enough to sustain local aquatic life.
               </p>
               <div className="space-y-6">
                 <div className="flex justify-between border-b border-white/20 pb-4">
                   <span className="text-green-200 font-bold uppercase tracking-widest text-sm">Treatment Capacity</span>
                   <span className="font-mono text-xl font-bold text-white">4,000 m³/day</span>
                 </div>
                 <div className="flex justify-between border-b border-white/20 pb-4">
                   <span className="text-green-200 font-bold uppercase tracking-widest text-sm">Recovery Rate</span>
                   <span className="font-mono text-xl font-bold text-white">95%</span>
                 </div>
               </div>
            </div>
         </div>
      </section>

    </div>
  );
}
