import { Button } from '@/components/ui/Button';
import heroImage from '@/assets/hero.png';
import { ArrowRight, Cog, Scissors, Droplets, ShieldCheck, Ruler, Truck } from 'lucide-react';

const CAPABILITIES = [
  {
    title: 'Research & Development',
    desc: 'Our in-house R&D lab pioneers new fabric blends, innovative wash techniques, and sustainable dyeing processes before they hit the market.',
    icon: Cog,
  },
  {
    title: 'Precision Cutting',
    desc: 'Automated laser cutting machinery ensures zero-defect precision and minimizes fabric waste by up to 15%.',
    icon: Scissors,
  },
  {
    title: 'Advanced Dyeing',
    desc: 'State-of-the-art closed-loop dyeing systems that drastically reduce water consumption while achieving vibrant, colorfast results.',
    icon: Droplets,
  },
  {
    title: 'Quality Assurance',
    desc: 'Multi-stage AQL 1.5 inspection protocols implemented across every production line to guarantee flawless final products.',
    icon: ShieldCheck,
  },
  {
    title: 'Pattern Engineering',
    desc: '3D CAD pattern making allowing for rapid prototyping, perfect fit scaling, and reduced physical sampling.',
    icon: Ruler,
  },
  {
    title: 'Global Logistics',
    desc: 'Integrated supply chain management with real-time tracking, ensuring on-time delivery to over 45 countries worldwide.',
    icon: Truck,
  }
];

export function Capabilities() {
  return (
    <div className="w-full font-sans bg-white pt-24 pb-0">
      
      {/* 1. Hero Section */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8 text-center max-w-4xl">
          <p className="text-[#0047ff] font-bold text-xs uppercase tracking-widest mb-6">Vertical Integration</p>
          <h1 className="text-5xl md:text-7xl font-bold text-black leading-[1.1] mb-8">
            End-to-End Manufacturing Capabilities
          </h1>
          <p className="text-xl text-gray-500 leading-relaxed mb-12">
            We control every node of the supply chain—from yarn sourcing to final dispatch—ensuring uncompromising quality, agility, and ethical compliance at industrial scale.
          </p>
        </div>
      </section>

      {/* 2. Hero Image Banner */}
      <section className="container mx-auto px-4 md:px-8 pb-24">
        <div className="w-full h-[600px] rounded-3xl overflow-hidden relative">
          <img src={heroImage} alt="Factory Machinery" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-12 left-12 right-12 flex justify-between items-end">
             <div className="text-white">
                <p className="text-sm font-bold uppercase tracking-widest text-white/70 mb-2">Facility Overview</p>
                <h3 className="text-3xl font-bold">1.2 Million Sq.Ft of Advanced Production Space</h3>
             </div>
             <Button className="bg-white text-black hover:bg-gray-100 rounded-full font-bold px-8">
               Take a Virtual Tour
             </Button>
          </div>
        </div>
      </section>

      {/* 3. Core Capabilities Grid */}
      <section className="py-24 bg-[#f8f9fa] border-t border-gray-200">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black max-w-md">Our Core Infrastructure</h2>
            <p className="text-gray-500 max-w-sm text-right hidden md:block">
              Equipped with latest-generation technology from Germany, Japan, and South Korea.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {CAPABILITIES.map((cap, i) => (
              <div key={i} className="flex flex-col relative group cursor-pointer">
                <div className="w-16 h-16 rounded-xl bg-white shadow-md border border-gray-100 flex items-center justify-center text-[#0047ff] mb-6 group-hover:scale-110 group-hover:bg-[#0047ff] group-hover:text-white transition-all duration-300">
                  <cap.icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">{cap.title}</h3>
                <p className="text-gray-500 leading-relaxed">{cap.desc}</p>
                <div className="mt-6 flex items-center text-[#0047ff] font-bold text-sm uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                  Explore <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Deep Dive: Circular Knitting */}
      <section className="py-0 bg-white relative">
         <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-12 md:p-24 lg:p-32 flex flex-col justify-center bg-[#0a1128] text-white">
               <p className="text-[#4d79ff] font-bold text-xs uppercase tracking-widest mb-6">Process Spotlight</p>
               <h2 className="text-4xl md:text-5xl font-bold mb-8">Circular Knitting Complex</h2>
               <p className="text-gray-400 text-lg leading-relaxed mb-12">
                 Our knitting facility houses over 350 high-speed circular and flat knitting machines, capable of producing complex jacquards, fine-gauge interlocks, and performance fleece with unparalleled consistency.
               </p>
               <div className="space-y-6">
                 <div className="flex justify-between border-b border-white/10 pb-4">
                   <span className="text-gray-400 font-bold uppercase tracking-widest text-sm">Daily Capacity</span>
                   <span className="font-mono text-xl font-bold text-white">45,000 kg</span>
                 </div>
                 <div className="flex justify-between border-b border-white/10 pb-4">
                   <span className="text-gray-400 font-bold uppercase tracking-widest text-sm">Machine Types</span>
                   <span className="font-mono text-xl font-bold text-white">Mayer & Cie / Pailung</span>
                 </div>
                 <div className="flex justify-between border-b border-white/10 pb-4">
                   <span className="text-gray-400 font-bold uppercase tracking-widest text-sm">Gauges Available</span>
                   <span className="font-mono text-xl font-bold text-white">12G - 32G</span>
                 </div>
               </div>
            </div>
            <div className="relative min-h-[500px]">
               <img src={heroImage} alt="Circular Knitting" className="absolute inset-0 w-full h-full object-cover" />
            </div>
         </div>
      </section>
      
    </div>
  );
}
