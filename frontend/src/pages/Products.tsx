import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import heroFgImage from '@/assets/products-hero-fg.jpg';
import showroomBgImage from '@/assets/products-showroom-bg.jpg';
import categoryMenswear from '@/assets/category-menswear.png';
import categoryLadieswear from '@/assets/category-ladieswear.png';
import categoryChristmas from '@/assets/category-christmas.png';
import fabricsImage from '@/assets/fabrics.png';
import { Filter, ChevronDown, Check } from 'lucide-react';

const PRODUCTS = [
  {
    id: 1,
    title: "Premium Men's Sweaters & Cardigans",
    category: 'Menswear',
    description: "High-quality men's knitwear featuring timeless designs, premium textures, and sophisticated colors for international brands.",
    gauge: '12 Gauge',
    yarn: 'Merino / Cashmere',
    moq: '300 Pcs/Color',
    image: categoryMenswear,
    customization: true
  },
  {
    id: 2,
    title: "Elegant Women's Knit Fashion",
    category: 'Ladieswear',
    description: "Sophisticated women's knitwear collections offering exceptional comfort, delicate structures, and trend-setting styles.",
    gauge: '7 Gauge',
    yarn: 'Organic Cotton',
    moq: '300 Pcs/Color',
    image: categoryLadieswear,
    customization: true
  },
  {
    id: 3,
    title: 'Seasonal Festive Knitwear',
    category: 'Christmas Jumpers',
    description: 'Premium seasonal sweaters featuring intarsia and jacquard festive designs with high-quality yarn compositions.',
    gauge: '10 Gauge',
    yarn: 'Acrylic / Cotton',
    moq: '300 Pcs/Color',
    image: categoryChristmas,
    customization: true
  },
  {
    id: 4,
    title: 'Scarves, Beanies & Mittens',
    category: 'Accessories',
    description: 'Coordinating knitted accessories designed with precision for warmth, durability, and retail appeal.',
    gauge: '5 Gauge',
    yarn: 'Lambswool',
    moq: '300 Pcs/Color',
    image: heroFgImage,
    customization: true
  },
  {
    id: 5,
    title: 'Knitted Blankets & Throws',
    category: 'Homeware',
    description: 'Luxurious knitted homeware pieces designed for comfort and interior styling with premium organic fibers.',
    gauge: '5 Gauge',
    yarn: 'Combed Cotton',
    moq: '300 Pcs/Color',
    image: fabricsImage,
    customization: true
  },
  {
    id: 6,
    title: 'Pet Knitwear Collection',
    category: 'Accessories',
    description: 'Durable, comfortable, and stylish knitted apparel specifically designed and fitted for pets.',
    gauge: '12 Gauge',
    yarn: 'Acrylic Blend',
    moq: '300 Pcs/Color',
    image: heroFgImage,
    customization: true
  }
];

export function Products() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredProducts = activeCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeCategory);

  return (
    <div className="w-full font-sans bg-gray-50 pt-20 pb-16 overflow-hidden">

      {/* 1. Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative bg-white py-16 md:py-24 border-b border-gray-200 overflow-hidden"
      >
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
          <img src={showroomBgImage} alt="Premium Showroom" className="w-full h-full object-cover object-center md:object-right opacity-100" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/50 to-transparent md:backdrop-blur-[1px]" />
        </div>

        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
          <div className="md:w-1/2">
            <h1 className="text-5xl md:text-6xl font-bold text-black leading-[1.1] mb-6 drop-shadow-sm">
              The Fabric of Innovation
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed max-w-lg mb-8 font-medium">
              Explore our export-quality knitwear collections manufactured to international standards.
            </p>
            <div className="flex gap-4">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button size="lg" className="bg-[#0047ff] hover:bg-[#0038cc] text-white rounded-md font-bold px-8 shadow-lg shadow-blue-500/20">
                  Download Full Catalog
                </Button>
              </motion.div>
            </div>
          </div>
          <div className="md:w-1/2 relative w-full flex md:justify-end mt-8 md:mt-0">
            <motion.div 
              whileHover={{ y: -6 }}
              className="w-full md:max-w-[90%] aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] transition-all duration-500 border-[8px] border-white/90 backdrop-blur-md relative group"
            >
              <img src={heroFgImage} alt="Premium Knitwear Collection" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 2. Catalog Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8 flex flex-col lg:flex-row gap-12">

          {/* Sidebar */}
          <aside className="w-full lg:w-64 flex-shrink-0">
            <div className="flex items-center gap-2 mb-8 text-black">
              <Filter className="w-5 h-5" />
              <h3 className="font-bold text-lg">Filters</h3>
            </div>

            <div className="space-y-8">
              <div>
                <h4 className="font-bold text-sm uppercase tracking-widest text-gray-400 mb-4 flex justify-between items-center cursor-pointer">
                  Yarn Types <ChevronDown className="w-4 h-4" />
                </h4>
                <div className="space-y-3">
                  {['Organic Cotton', 'Combed Cotton', 'Merino Wool', 'Lambswool', 'Cashmere', 'Acrylic', 'Viscose', 'Cotton Blend'].map(f => (
                    <label key={f} className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-5 h-5 border border-gray-300 rounded-[4px] flex items-center justify-center group-hover:border-[#0047ff] transition-colors"></div>
                      <span className="text-gray-600 text-sm group-hover:text-black transition-colors">{f}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-sm uppercase tracking-widest text-gray-400 mb-4 flex justify-between items-center cursor-pointer">
                  Gauge <ChevronDown className="w-4 h-4" />
                </h4>
                <div className="space-y-3">
                  {['5 Gauge', '7 Gauge', '10 Gauge', '12 Gauge', '14 Gauge'].map(f => (
                    <label key={f} className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-5 h-5 border border-gray-300 rounded-[4px] flex items-center justify-center group-hover:border-[#0047ff] transition-colors"></div>
                      <span className="text-gray-600 text-sm group-hover:text-black transition-colors">{f}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-sm uppercase tracking-widest text-gray-400 mb-4 flex justify-between items-center cursor-pointer">
                  Knitting Structure <ChevronDown className="w-4 h-4" />
                </h4>
                <div className="space-y-3">
                  {['Cable Knit', 'Jacquard', 'Intarsia', 'Fine Knit', 'Chunky Knit'].map(f => (
                    <label key={f} className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-5 h-5 border border-gray-300 rounded-[4px] flex items-center justify-center group-hover:border-[#0047ff] transition-colors"></div>
                      <span className="text-gray-600 text-sm group-hover:text-black transition-colors">{f}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Grid */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-black">Product Catalogue</h2>
              <div className="flex flex-wrap gap-2 md:gap-4 justify-end">
                {['All', 'Menswear', 'Ladieswear', 'Christmas Jumpers', 'Accessories', 'Homeware'].map(cat => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`relative text-sm font-semibold px-4 py-2 rounded-full transition-colors ${
                        isActive ? 'text-white' : 'text-gray-600 hover:text-black'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="categoryActivePill"
                          className="absolute inset-0 bg-black rounded-full"
                          transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{cat}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map(product => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ y: -6 }}
                    className="bg-white border border-gray-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col group"
                  >
                    <div className="w-full aspect-[4/5] bg-gray-50 relative overflow-hidden">
                      <img src={product.image} alt={product.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="bg-white/95 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 text-black rounded-full shadow-sm">
                          {product.category}
                        </span>
                      </div>
                      {product.customization && (
                        <div className="absolute top-4 right-4 flex gap-2">
                          <span className="bg-black/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 text-white rounded-full shadow-sm">
                            Customizable
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="p-6 lg:p-8 flex flex-col flex-1 bg-white">
                      <h3 className="text-xl font-bold text-black mb-3 leading-tight group-hover:text-[#0047ff] transition-colors">{product.title}</h3>
                      <p className="text-sm text-gray-500 mb-6 leading-relaxed line-clamp-2">{product.description}</p>

                      <div className="grid grid-cols-2 gap-y-4 gap-x-6 mb-8 mt-auto pt-6 border-t border-gray-100">
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">Gauge</p>
                          <p className="text-sm font-semibold text-black font-mono">{product.gauge}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">Yarn</p>
                          <p className="text-sm font-semibold text-black">{product.yarn}</p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1.5">Minimum Order</p>
                          <p className="text-sm font-semibold text-black font-mono">{product.moq}</p>
                        </div>
                      </div>

                      <div className="mt-auto">
                        <Button className="w-full bg-white border-2 border-black text-black hover:bg-black hover:text-white rounded-xl font-bold text-xs uppercase tracking-wider py-6 transition-all duration-300">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </main>
        </div>
      </section>

      {/* 3. Eco-Performance Series Highlight */}
      <section className="bg-[#111111] text-white mt-16 py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="container mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-16 items-center"
        >
          <div className="order-2 md:order-1 relative rounded-2xl overflow-hidden aspect-square md:aspect-auto md:h-full min-h-[400px] group">
            <img src={heroFgImage} alt="Eco Performance" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" loading="lazy" />
          </div>
          <div className="order-1 md:order-2 space-y-8">
            <p className="text-[#0047ff] font-bold text-xs uppercase tracking-widest">Innovation Spotlight</p>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">Eco-Performance Series</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Our latest breakthrough in sustainable athletic wear. Utilizing 100% post-consumer recycled ocean plastics blended with bio-based elastane for uncompromising four-way stretch.
            </p>
            <ul className="space-y-4 pt-4">
              <li className="flex gap-4">
                <Check className="text-[#0047ff] w-6 h-6 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-white">Zero Virgin Plastics</h4>
                  <p className="text-sm text-gray-400">Certified by Global Recycled Standard (GRS).</p>
                </div>
              </li>
              <li className="flex gap-4">
                <Check className="text-[#0047ff] w-6 h-6 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-white">Closed-Loop Dyeing</h4>
                  <p className="text-sm text-gray-400">Waterless coloration technology saving 80L of water per kg.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <Check className="text-[#0047ff] w-6 h-6 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-white">Unmatched Durability</h4>
                  <p className="text-sm text-gray-400">Engineered to withstand 150+ industrial wash cycles.</p>
                </div>
              </li>
            </ul>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
