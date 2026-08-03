import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ArrowRight, CheckCircle2, ShieldCheck, Mail, Phone, MapPin, Building2, Send } from 'lucide-react';
import homeHero from '@/assets/home-hero.png';
import fabricsImage from '@/assets/fabrics.png';
import designSamplingImage from '@/assets/design-sampling.png';
import yarnSourcingImage from '@/assets/yarn-sourcing.png';
import flatbedKnittingImage from '@/assets/flatbed-knitting.png';
import garmentLinkingImage from '@/assets/garment-linking.png';
import finishingQcImage from '@/assets/finishing-qc.png';
import exportPackagingImage from '@/assets/export-packaging.png';
import categoryMenswear from '@/assets/category-menswear.png';
import categoryLadieswear from '@/assets/category-ladieswear.png';
import categoryChristmas from '@/assets/category-christmas.png';
import categoryAccessories from '@/assets/category-accessories.png';

const testimonials = [
  {
    quote: "Al-Amin Export has been our manufacturing partner for 8 years. Their quality consistency, compliance culture, and on-time delivery are simply unmatched anywhere in Bangladesh.",
    name: "Sarah Mitchell",
    position: "Head of Sourcing - Primark UK",
    initials: "SM"
  },
  {
    quote: "The level of sweater craftsmanship is extraordinary. They handle our complex jacquard designs and premium merino wool blends with exceptional precision.",
    name: "David Chen",
    position: "Production Director - UNIQLO",
    initials: "DC"
  },
  {
    quote: "We value their deep commitment to sustainability. From solar-powered facilities to water recycling, they align perfectly with our global eco-initiatives.",
    name: "Elena Rodriguez",
    position: "Sustainability Lead - ZARA",
    initials: "ER"
  },
  {
    quote: "Professional communication and a true long-term partnership approach. They don't just manufacture; they proactively solve supply chain challenges.",
    name: "Marcus Weber",
    position: "VP Supply Chain - H&M Group",
    initials: "MW"
  }
];

export function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isHovered, testimonials.length]);

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
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 md:px-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-400/30 text-center">
            <motion.div whileHover={{ scale: 1.03 }} className="flex flex-col items-center justify-center p-4 transition-transform">
              <span className="text-4xl lg:text-5xl font-bold text-black mb-2 font-mono">25+</span>
              <span className="text-sm tracking-widest uppercase text-black/70 font-semibold">Years of Excellence</span>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} className="flex flex-col items-center justify-center p-4 transition-transform">
              <span className="text-4xl lg:text-5xl font-bold text-black mb-2 font-mono">5,000+</span>
              <span className="text-sm tracking-widest uppercase text-black/70 font-semibold">Skilled Artisans</span>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} className="flex flex-col items-center justify-center p-4 transition-transform">
              <span className="text-4xl lg:text-5xl font-bold text-black mb-2 font-mono">20M+</span>
              <span className="text-sm tracking-widest uppercase text-black/70 font-semibold">Annual Production (Pieces)</span>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 3. Partner Ribbon */}
      <section className="bg-[#f8f9fa] py-16 border-b border-gray-200 overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <p className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-10">Trusted Manufacturing Partner</p>
          <div className="relative w-full overflow-hidden">
            {/* Gradient masks for smooth fade effect on edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#f8f9fa] to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#f8f9fa] to-transparent z-10 pointer-events-none" />

            <motion.div
              className="flex items-center gap-12 md:gap-20 lg:gap-28 w-max opacity-60 grayscale"
              animate={{ x: ['0%', '-50%'] }}
              transition={{
                ease: 'linear',
                duration: 20,
                repeat: Infinity,
              }}
            >
              {['Walmart', 'Target', 'H&M', 'ZARA', 'Uniqlo', 'Levi\'s', 'GAP', 'Walmart', 'Target', 'H&M', 'ZARA', 'Uniqlo', 'Levi\'s', 'GAP'].map((partner, idx) => (
                <span key={idx} className="text-2xl md:text-3xl font-bold text-gray-800 italic font-serif whitespace-nowrap shrink-0">
                  {partner}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Pioneering the Future */}
      <section className="py-24 lg:py-32 bg-white">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="container mx-auto px-4 md:px-8 grid lg:grid-cols-2 gap-16 items-center"
        >
          <div className="relative">
            <div className="relative aspect-[4/5] w-[85%] overflow-hidden bg-gray-100 rounded-2xl shadow-lg group">
              <img src={fabricsImage} alt="Premium Textile Fabrics" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            </div>
            {/* Blue floating square */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="absolute bottom-10 right-0 w-48 h-48 bg-[#0047ff] text-white flex flex-col justify-center items-center p-6 text-center shadow-xl rounded-xl"
            >
              <span className="text-5xl font-bold mb-2 font-mono">2002</span>
              <span className="text-xs uppercase tracking-widest font-semibold opacity-90">Foundation Year</span>
            </motion.div>
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
                <div className="absolute -left-[41px] top-1 w-4 h-4 bg-[#0047ff] rounded-full shadow-sm" />
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
        </motion.div>
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
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -6 }}
                className="bg-white p-8 rounded-xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_30px_-4px_rgba(0,0,0,0.12)] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-blue-50 text-[#0047ff] flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-black mb-3 text-lg">{adv.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{adv.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. End-to-End Sweater Manufacturing Excellence */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-12 border-b border-gray-200 pb-8 flex justify-between items-end">
            <span>End-to-End Sweater<br />Manufacturing Excellence</span>
            <div className="hidden md:block w-32 h-1 bg-gray-200"><div className="w-16 h-full bg-[#0047ff]"></div></div>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Design & Sampling",
                desc: "In-house design development using Shima Seiki Apex CAD with rapid sampling from sketches, tech packs, and fabric swatches.",
                image: designSamplingImage,
              },
              {
                title: "Premium Yarn Sourcing",
                desc: "Carefully sourced natural and synthetic yarns selected to meet international quality standards.",
                image: yarnSourcingImage,
              },
              {
                title: "Precision Flat-Bed Knitting",
                desc: "Advanced Japanese knitting technology delivering precise, consistent, and high-quality knitwear production.",
                image: flatbedKnittingImage,
              },
              {
                title: "Linking & Garment Assembly",
                desc: "Skilled technicians carefully assemble every garment to ensure excellent fit and durability.",
                image: garmentLinkingImage,
              },
              {
                title: "Finishing & Quality Control",
                desc: "Every product undergoes rigorous inspection, finishing, measurement verification, and final quality assurance before shipment.",
                image: finishingQcImage,
              },
              {
                title: "Export Packaging & Global Delivery",
                desc: "Secure packaging and efficient logistics ensure reliable delivery to international fashion brands.",
                image: exportPackagingImage,
              },
            ].map((process, i) => (
              <div key={i} className="relative aspect-square group overflow-hidden rounded-2xl bg-gray-100">
                <img src={process.image} alt={process.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-xs uppercase tracking-widest font-semibold text-white/70 mb-1">Process 0{i + 1}</p>
                  <h4 className="text-xl font-bold mb-2">{process.title}</h4>
                  <p className="text-xs text-white/80 leading-relaxed font-normal">{process.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Premium Knitwear Collections */}
      <section className="py-24 bg-[#0a0a0a] text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <p className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">
              Crafting high-quality knitwear for leading international fashion brands.
            </p>
            <h2 className="text-4xl md:text-5xl font-bold">Premium Knitwear Collections</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Menswear", sub: "Premium Sweaters & Cardigans", image: categoryMenswear },
              { title: "Ladieswear", sub: "Sweaters, Cardigans & Knit Fashion", image: categoryLadieswear },
              { title: "Christmas Jumpers", sub: "Seasonal Knitwear Collection", image: categoryChristmas },
              { title: "Knitted Accessories", sub: "Beanies, Scarves & Mittens", image: categoryAccessories },
            ].map((cat, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-full aspect-square rounded-2xl overflow-hidden mb-6 bg-gray-800 relative">
                  <img src={cat.image} alt={cat.title} className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                </div>
                <h4 className="text-xl font-bold mb-1">{cat.title}</h4>
                <p className="text-xs text-gray-400 tracking-wider uppercase font-medium">{cat.sub}</p>
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
          <div className="relative min-h-[450px] lg:min-h-full overflow-hidden bg-[#062617] group">
            <img
              src={yarnSourcingImage}
              alt="Sustainable Organic Yarn & Eco Manufacturing"
              className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#0b4d2e]/90 via-[#0b4d2e]/40 to-transparent" />

            {/* Floating Glassmorphism Badges */}
            <div className="absolute bottom-10 left-10 right-10 grid grid-cols-1 sm:grid-cols-2 gap-4 z-10">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-xl text-white">
                <span className="text-2xl font-bold text-green-300 block mb-1">Rooftop Solar</span>
                <span className="text-xs text-white/80 font-medium">Clean energy grid powering 60% of automated flat-bed knitting.</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-xl text-white">
                <span className="text-2xl font-bold text-green-300 block mb-1">ETP Water Plant</span>
                <span className="text-xs text-white/80 font-medium">Closed-loop zero liquid discharge water recycling system.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Global Supply Chain Engine */}
      <section className="py-24 bg-[#0a1128] text-white overflow-hidden relative">
        <div className="container mx-auto px-4 md:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-semibold uppercase tracking-widest mb-6">
              Global Distribution Network
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-[1.2] mb-6">A Global Supply Chain Engine</h2>
            <p className="text-gray-300 text-lg leading-relaxed mb-12">
              From our high-capacity manufacturing hubs, we orchestrate precision-engineered apparel logistics to over 45 countries across 6 continents.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-4xl font-bold text-white mb-2">45+</p>
                <p className="text-xs uppercase tracking-widest text-blue-300/70 font-semibold">Countries</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-white mb-2">12h</p>
                <p className="text-xs uppercase tracking-widest text-blue-300/70 font-semibold">Avg Dispatch</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-white mb-2">0.02%</p>
                <p className="text-xs uppercase tracking-widest text-blue-300/70 font-semibold">Transit Loss</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-white mb-2">24/7</p>
                <p className="text-xs uppercase tracking-widest text-blue-300/70 font-semibold">Global Support</p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 h-[500px] w-full rounded-2xl relative overflow-hidden shadow-2xl group">
            <img src={exportPackagingImage} alt="Export Packaging Logistics" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a1128] via-transparent to-transparent pointer-events-none" />
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
      <section className="py-24 bg-[#0a0a0a] text-white relative">
        <div className="container mx-auto px-4 md:px-8 flex flex-col items-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">What Our Buyers Say</h2>

          <div
            className="rounded-3xl p-8 md:p-12 lg:p-16 max-w-5xl w-full text-center relative overflow-hidden"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Subtle giant quote icon in the background */}
            <span className="absolute top-0 left-1/2 -translate-x-1/2 text-[180px] text-white/5 font-serif leading-none pointer-events-none select-none">
              "
            </span>

            <div className="flex justify-center mb-10 text-[#f5c518] relative z-10">
              {/* Stars */}
              {[1, 2, 3, 4, 5].map(s => <span key={s}>★</span>)}
            </div>

            <div className="relative h-[320px] sm:h-[280px] md:h-[220px] w-full flex items-center justify-center z-10">
              {testimonials.map((testi, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{
                    opacity: currentTestimonial === idx ? 1 : 0,
                    x: currentTestimonial === idx ? 0 : currentTestimonial > idx ? -20 : 20,
                    pointerEvents: currentTestimonial === idx ? 'auto' : 'none'
                  }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="absolute inset-0 flex flex-col items-center justify-center"
                >
                  <p className="text-xl sm:text-2xl md:text-3xl font-medium leading-relaxed mb-10 text-white/90">
                    "{testi.quote}"
                  </p>
                  <div className="flex flex-col items-center md:flex-row md:justify-center gap-4 mt-auto">
                    <div className="w-12 h-12 rounded-full bg-[#0047ff]/20 border border-[#0047ff]/30 flex items-center justify-center text-[#0047ff] font-bold text-lg">
                      {testi.initials}
                    </div>
                    <div className="text-center md:text-left">
                      <p className="font-bold text-white">{testi.name}</p>
                      <p className="text-gray-400 text-sm mt-0.5">{testi.position}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-3 mt-12 relative z-10">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentTestimonial(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${currentTestimonial === idx ? 'w-8 bg-[#0047ff]' : 'w-2.5 bg-white/20 hover:bg-white/40'}`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 12. Start Your Global Partnership */}
      <section className="py-24 relative bg-[#f8f9fa]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column: Bright & Clean Brand Info */}
            <div className="flex flex-col justify-center">


              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black leading-[1.1] mb-6">
                Start Your Global Partnership
              </h2>

              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-10 font-normal max-w-lg">
                Connect with our executive sourcing team to discuss bespoke, high-volume sweater manufacturing solutions tailored for leading international fashion brands.
              </p>

              <div className="space-y-6 pt-6 border-t border-gray-200/80">
                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0047ff] shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-0.5">Global Sourcing</p>
                    <p className="text-lg font-bold font-mono text-gray-900">partners@alaminexport.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0047ff] shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-0.5">Global HQ Direct</p>
                    <p className="text-lg font-bold font-mono text-gray-900">+880 (2) 988-5102</p>
                  </div>
                </div>

                <div className="flex items-center gap-5">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#0047ff] shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-0.5">Manufacturing Hub</p>
                    <p className="text-sm font-semibold text-gray-800">Gazipur & Dhaka Export Zone, Bangladesh</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Bright Form Card */}
            <div className="bg-white p-8 md:p-12 rounded-3xl border border-gray-200/80 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.08)]">
              <div className="flex items-center gap-3 mb-2">
                <Building2 className="w-6 h-6 text-[#0047ff]" />
                <h3 className="text-2xl md:text-3xl font-bold text-black">Request Consultation</h3>
              </div>
              <p className="text-sm text-gray-500 mb-8">Fill out the form below to receive a custom production estimate within 24 hours.</p>

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-600 font-semibold">First Name</label>
                    <input
                      type="text"
                      placeholder="John"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-[#0047ff] focus:ring-1 focus:ring-[#0047ff] transition-all text-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-gray-600 font-semibold">Last Name</label>
                    <input
                      type="text"
                      placeholder="Doe"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-[#0047ff] focus:ring-1 focus:ring-[#0047ff] transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-600 font-semibold">Company Entity</label>
                  <input
                    type="text"
                    placeholder="Global Brand or Retailer Name"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-[#0047ff] focus:ring-1 focus:ring-[#0047ff] transition-all text-sm"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gray-600 font-semibold">Project Inquiry</label>
                  <textarea
                    rows={4}
                    placeholder="Describe target order volume, yarn preferences, or timeline..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:bg-white focus:border-[#0047ff] focus:ring-1 focus:ring-[#0047ff] transition-all text-sm resize-none"
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#0047ff] hover:bg-[#0038cc] text-white py-6 rounded-xl font-bold text-base flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 transition-all mt-2"
                >
                  Submit Strategic Inquiry <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
