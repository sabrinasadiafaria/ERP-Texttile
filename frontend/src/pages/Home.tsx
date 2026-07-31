import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import heroImage from '@/assets/hero.png';
import homeHero from '@/assets/home-hero.png';

export function Home() {
  return (
    <div className="w-full font-sans">
      
      {/* 1. Hero Section */}
      <section className="relative w-full min-h-screen flex items-center justify-start pt-20">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${homeHero})` }}
        />
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 z-0 bg-black/60" />

        <div className="container mx-auto px-4 md:px-8 relative z-10 text-white max-w-4xl pt-20">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-5xl md:text-6xl lg:text-[72px] font-bold leading-[1.1] tracking-tight mb-8"
          >
            Manufacturing Apparel for the World's Leading Brands
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-lg md:text-xl text-white/90 max-w-2xl leading-relaxed mb-10 font-medium"
          >
            From concept to global distribution, we engineer luxury garments with industrial precision and ethical integrity.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <Button size="lg" className="rounded-full bg-accent hover:bg-accent/90 text-white font-semibold px-8 py-6 flex items-center gap-2">
              Explore Us <ArrowRight className="w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 2. Stats Bar */}
      <section className="bg-[#e4e6eb] py-12 border-b border-[#d1d3d8]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-400/30 text-center">
            <div className="flex flex-col items-center justify-center p-4">
              <span className="text-4xl lg:text-5xl font-bold text-black mb-2">25+</span>
              <span className="text-sm tracking-widest uppercase text-black/70 font-semibold">Years of Excellence</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <span className="text-4xl lg:text-5xl font-bold text-black mb-2">5,000+</span>
              <span className="text-sm tracking-widest uppercase text-black/70 font-semibold">Skilled Artisans</span>
            </div>
            <div className="flex flex-col items-center justify-center p-4">
              <span className="text-4xl lg:text-5xl font-bold text-black mb-2">20M+</span>
              <span className="text-sm tracking-widest uppercase text-black/70 font-semibold">Annual Production (Pieces)</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Partner Ribbon */}
      <section className="bg-[#f8f9fa] py-16 border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <p className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-10">Trusted Manufacturing Partner</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 lg:gap-24 opacity-60 grayscale">
            {['Walmart', 'Target', 'H&M', 'ZARA', 'Uniqlo', 'Walmart'].map((partner, idx) => (
              <span key={idx} className="text-2xl md:text-3xl font-bold text-gray-800 italic font-serif">
                {partner}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Pioneering the Future */}
      <section className="py-24 lg:py-32 bg-white">
        <div className="container mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="relative aspect-[4/5] w-[85%] overflow-hidden bg-gray-100">
              <img src={heroImage} alt="Factory Interior" className="w-full h-full object-cover" />
            </div>
            {/* Blue floating square */}
            <div className="absolute bottom-10 right-0 w-48 h-48 bg-[#0047ff] text-white flex flex-col justify-center items-center p-6 text-center">
              <span className="text-5xl font-bold mb-2">2002</span>
              <span className="text-xs uppercase tracking-widest font-semibold opacity-90">Foundation Year</span>
            </div>
          </div>
          
          <div className="flex flex-col space-y-8 pr-0 lg:pr-12">
            <h2 className="text-4xl lg:text-5xl font-bold leading-[1.1] text-black">
              Pioneering the Future of Global Apparel Production
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Al-Amin Export is more than a factory. We are a vertically integrated ecosystem where advanced engineering meets the delicate touch of couture. Our mission is to empower global brands with a supply chain that is as agile as it is ethical.
            </p>
            
            <div className="space-y-6 pt-4 border-l-2 border-gray-200 ml-3 pl-8 relative">
              <div className="relative">
                <div className="absolute -left-[41px] top-1 w-4 h-4 bg-[#0047ff] rounded-full" />
                <h4 className="font-bold text-black text-lg">Inception & Craft (2002)</h4>
                <p className="text-gray-500 mt-1">Started as a boutique sewing house for premium European labels.</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[41px] top-1 w-4 h-4 bg-gray-300 rounded-full" />
                <h4 className="font-bold text-black text-lg">Industrial Scale (2008)</h4>
                <p className="text-gray-500 mt-1">Expansion into fully automated knitting and dyeing facilities.</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[41px] top-1 w-4 h-4 bg-gray-300 rounded-full" />
                <h4 className="font-bold text-black text-lg">Global Leadership (2024)</h4>
                <p className="text-gray-500 mt-1">Pioneering sustainable, zero-waste manufacturing for the 21st century.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. The Industrial Advantage */}
      <section className="py-24 bg-[#f8f9fa]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.2em] text-[#0047ff] uppercase mb-4">Value Engineering</p>
            <h2 className="text-4xl md:text-5xl font-bold text-black">The Industrial Advantage</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Ethical Manufacturing", desc: "BSCI & SEDEX audited facilities with fair labor practices and safe working conditions." },
              { title: "Competitive Pricing", desc: "Cost-efficient production through lean manufacturing without compromising quality." },
              { title: "Advanced Machinery", desc: "Latest-generation equipment sourced from Germany, Japan, and South Korea." },
              { title: "Experienced Workforce", desc: "5,000+ skilled workers with structured training programs and technical certification." },
              { title: "On-time Delivery", desc: "98.7% on-time shipment rate backed by our robust supply chain management." },
              { title: "Sustainable Production", desc: "Solar-powered facilities, water recycling, and science-based carbon reduction." },
              { title: "OEM & ODM Services", desc: "Full-service product development — from concept and design to finished garment." },
              { title: "Global Compliance", desc: "Meeting EU, US, UK, Australian and Asian regulatory and compliance standards." },
            ].map((adv, i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.1)] transition-all">
                <div className="w-12 h-12 rounded-full bg-blue-50 text-[#0047ff] flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-black mb-3 text-lg">{adv.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Full-Stack Production Capabilities */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-12 border-b border-gray-200 pb-8 flex justify-between items-end">
            <span>Full-Stack Production<br/>Capabilities</span>
            <div className="hidden md:block w-32 h-1 bg-gray-200"><div className="w-16 h-full bg-[#0047ff]"></div></div>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              "Circular Knitting", "Precision Dyeing", "Automated Cutting",
              "Fine Embroidery", "Assembly & Sewing", "Quality Inspection"
            ].map((process, i) => (
              <div key={i} className="relative aspect-square group overflow-hidden rounded-2xl bg-gray-100">
                <img src={heroImage} alt={process} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <p className="text-xs uppercase tracking-widest font-semibold text-white/70 mb-2">Process 0{i+1}</p>
                  <h4 className="text-2xl font-bold">{process}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Engineered for Global Demand */}
      <section className="py-24 bg-[#0a0a0a] text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">Product Categories</p>
            <h2 className="text-4xl md:text-5xl font-bold">Engineered for Global Demand</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Essentials", sub: "T-Shirts & Polos" },
              { title: "Fleece", sub: "Hoodies & Crewnecks" },
              { title: "Denim", sub: "Jeans & Jackets" },
              { title: "Performance", sub: "Active & Athleisure" },
            ].map((cat, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-full aspect-square rounded-2xl overflow-hidden mb-6 bg-gray-800">
                  <img src={heroImage} alt={cat.title} className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity" />
                </div>
                <h4 className="text-xl font-bold mb-1">{cat.title}</h4>
                <p className="text-sm text-gray-400 tracking-widest uppercase">{cat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Green Manufacturing */}
      <section className="py-0 bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          <div className="bg-[#0b4d2e] text-white p-12 md:p-24 flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-bold leading-[1.2] mb-6">
              Green Manufacturing for a Blue Planet
            </h2>
            <p className="text-white/80 text-lg leading-relaxed mb-12 max-w-lg">
              We are transforming the textile industry's footprint. Our facilities operate on 60% solar energy and feature a state-of-the-art Water Treatment Plant (ETP) that recycles 95% of our processing water.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-5xl font-bold text-green-300 mb-2">60%</p>
                <p className="text-xs uppercase tracking-widest font-semibold opacity-70">Solar Powered</p>
              </div>
              <div>
                <p className="text-5xl font-bold text-green-300 mb-2">95%</p>
                <p className="text-xs uppercase tracking-widest font-semibold opacity-70">Water Recycled</p>
              </div>
            </div>
          </div>
          <div className="relative min-h-[400px] lg:min-h-full">
            <img src={heroImage} alt="Solar Panels Factory" className="absolute inset-0 w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* 9. Global Supply Chain Engine */}
      <section className="py-24 bg-[#0a1128] text-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500 via-transparent to-transparent" />
        <div className="container mx-auto px-4 md:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/3">
            <h2 className="text-4xl md:text-5xl font-bold leading-[1.2] mb-6">A Global Supply Chain Engine</h2>
            <p className="text-gray-400 text-lg leading-relaxed mb-12">
              From our high-capacity manufacturing hubs, we orchestrate precision-engineered apparel logistics to over 45 countries across 6 continents.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-4xl font-bold mb-2">45+</p>
                <p className="text-xs uppercase tracking-widest text-gray-500">Countries</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">12h</p>
                <p className="text-xs uppercase tracking-widest text-gray-500">Avg Dispatch</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">0.02%</p>
                <p className="text-xs uppercase tracking-widest text-gray-500">Transit Loss</p>
              </div>
              <div>
                <p className="text-4xl font-bold mb-2">24/7</p>
                <p className="text-xs uppercase tracking-widest text-gray-500">Global Support</p>
              </div>
            </div>
          </div>
          <div className="lg:w-2/3 h-[400px] bg-white/5 rounded-2xl border border-white/10 relative flex items-center justify-center backdrop-blur-sm">
            {/* Map Placeholder */}
            <p className="text-white/20 text-xl font-bold tracking-[0.5em] uppercase">Interactive Map Graphic</p>
          </div>
        </div>
      </section>

      {/* 10. Global Compliance Standards */}
      <section className="py-24 bg-[#f4f5f7]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <h2 className="text-4xl md:text-5xl font-bold text-black max-w-lg">Global Compliance Standards</h2>
            <p className="text-gray-500 max-w-sm text-right hidden md:block">
              Our facilities are audited by leading international bodies to ensure the highest ethical benchmarks.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "BSCI", subtitle: "Social Compliance", desc: "Ensuring workplace safety and ethical treatment of all factory employees." },
              { title: "WRAP", subtitle: "Ethical Production", desc: "Worldwide Responsible Accredited Production certification for legal factory operation." },
              { title: "GOTS", subtitle: "Organic Textile", desc: "The worldwide leading textile processing standard for organic fibers." },
              { title: "OEKO-TEX", subtitle: "Fabric Safety", desc: "Standard 100 certification guaranteeing materials are free from harmful substances." },
            ].map((cert, i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 flex flex-col relative overflow-hidden">
                <div className="absolute top-4 right-4 opacity-5">
                  <ShieldCheck className="w-24 h-24" />
                </div>
                <h4 className="text-2xl font-bold text-black mb-1">{cert.title}</h4>
                <p className="text-xs font-bold tracking-widest uppercase text-[#0047ff] mb-6">{cert.subtitle}</p>
                <p className="text-gray-500 text-sm leading-relaxed mt-auto relative z-10">{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. What Our Buyers Say */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8 flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-16 text-center">What Our Buyers Say</h2>
          
          <div className="bg-[#f8f9fa] rounded-3xl p-12 md:p-16 max-w-4xl w-full text-center relative">
            <div className="flex justify-center mb-8 text-[#f5c518]">
              {/* Stars */}
              {[1,2,3,4,5].map(s => <span key={s}>★</span>)}
            </div>
            <p className="text-2xl md:text-3xl font-medium text-black leading-relaxed mb-12">
              "Al-Amin Export has been our manufacturing partner for 8 years. Their quality consistency, compliance culture, and on-time delivery are simply unmatched anywhere in Bangladesh."
            </p>
            <div>
              <p className="font-bold text-black">Sarah Mitchell</p>
              <p className="text-gray-500 text-sm mt-1">Head of Sourcing - Primark UK</p>
            </div>
          </div>
        </div>
      </section>

      {/* 12. Start Your Global Partnership */}
      <section className="py-0 relative bg-[#1c1c1c]">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="relative min-h-[400px] lg:min-h-[700px]">
             <img src={heroImage} alt="Office" className="absolute inset-0 w-full h-full object-cover opacity-50" />
             <div className="absolute inset-0 flex flex-col justify-center p-12 md:p-24">
                <h2 className="text-5xl md:text-6xl lg:text-[72px] font-bold text-white leading-[1.1] mb-8">
                  Start Your Global Partnership
                </h2>
                <p className="text-white/80 text-lg leading-relaxed max-w-md mb-12">
                  Connect with our executive sourcing team to discuss bespoke, high-volume manufacturing solutions designed for the world's most discerning enterprise brands.
                </p>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-white">
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5">
                      ✉
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-white/50">Global Sourcing</p>
                      <p className="text-xl font-bold font-mono">partners@alaminexport.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-white">
                    <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5">
                      ☏
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-widest text-white/50">Global HQ</p>
                      <p className="text-xl font-bold font-mono">+1 (888) 555-0192</p>
                    </div>
                  </div>
                </div>
             </div>
          </div>
          
          <div className="bg-[#242424] p-12 md:p-24 flex flex-col justify-center">
            <div className="max-w-md w-full mx-auto">
              <h3 className="text-2xl font-bold text-white mb-8">Request Consultation</h3>
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/50 font-semibold">First Name</label>
                    <input type="text" className="w-full bg-[#1c1c1c] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0047ff]" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/50 font-semibold">Last Name</label>
                    <input type="text" className="w-full bg-[#1c1c1c] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0047ff]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/50 font-semibold">Company Entity</label>
                  <input type="text" placeholder="Global Brand or Retailer Name" className="w-full bg-[#1c1c1c] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0047ff]" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/50 font-semibold">Project Inquiry</label>
                  <textarea rows={4} placeholder="Briefly describe your production requirements..." className="w-full bg-[#1c1c1c] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#0047ff]"></textarea>
                </div>
                <Button type="submit" className="w-full bg-[#0047ff] hover:bg-[#0038cc] text-white py-6 rounded-lg font-bold">
                  Submit Strategic Inquiry
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
    </div>
  );
}
