import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import heroImage from '@/assets/hero.png';
import { Filter, ChevronDown, Check } from 'lucide-react';

const PRODUCTS = [
  {
    id: 1,
    title: 'AeroCool Tech Tee',
    sku: 'P-4091',
    category: 'PERFORMANCE',
    type: 'KNIT',
    gsm: '140',
    comp: '100% PES',
    lead: '45 Days',
    image: heroImage,
  },
  {
    id: 2,
    title: 'Heavyweight Fleece Hoodie',
    sku: 'F-8820',
    category: 'ESSENTIALS',
    type: 'FLEECE',
    gsm: '320',
    comp: '80/20 CVC',
    lead: '60 Days',
    image: heroImage,
  },
  {
    id: 3,
    title: 'EcoStretch Denim Jacket',
    sku: 'D-1104',
    category: 'DENIM',
    type: 'WOVEN',
    gsm: '12oz',
    comp: '98% ORG COT / 2% EL',
    lead: '75 Days',
    image: heroImage,
  },
  {
    id: 4,
    title: 'Seamless Yoga Legging',
    sku: 'P-5531',
    category: 'PERFORMANCE',
    type: 'KNIT',
    gsm: '220',
    comp: '85% PA / 15% EA',
    lead: '60 Days',
    image: heroImage,
  }
];

export function Products() {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  return (
    <div className="w-full font-sans bg-gray-50 pt-24 pb-16">
      
      {/* 1. Hero Section */}
      <section className="bg-white py-16 md:py-24 border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <h1 className="text-5xl md:text-6xl font-bold text-black leading-[1.1] mb-6">
              The Fabric of Innovation
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed max-w-lg mb-8">
              Explore our comprehensive technical catalog. From sustainable organics to advanced performance synthetics, engineered for scale.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="bg-[#0047ff] hover:bg-[#0038cc] text-white rounded-md font-bold px-8">
                Download Full Catalog
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="w-full aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden shadow-xl">
               <img src={heroImage} alt="Fabric Innovation" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

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
                  Material Type <ChevronDown className="w-4 h-4" />
                </h4>
                <div className="space-y-3">
                  {['Cotton (Organic/BCI)', 'Polyester (Recycled)', 'Nylon / Polyamide', 'Viscose / Modal', 'Elastane Blends'].map(f => (
                    <label key={f} className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-5 h-5 border border-gray-300 rounded-[4px] flex items-center justify-center group-hover:border-[#0047ff]"></div>
                      <span className="text-gray-600 text-sm">{f}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-sm uppercase tracking-widest text-gray-400 mb-4 flex justify-between items-center cursor-pointer">
                  Properties <ChevronDown className="w-4 h-4" />
                </h4>
                <div className="space-y-3">
                  {['Moisture Wicking', 'Anti-Microbial', 'UV Protection', 'Water Repellent', '4-Way Stretch'].map(f => (
                    <label key={f} className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-5 h-5 border border-gray-300 rounded-[4px] flex items-center justify-center group-hover:border-[#0047ff]"></div>
                      <span className="text-gray-600 text-sm">{f}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-sm uppercase tracking-widest text-gray-400 mb-4 flex justify-between items-center cursor-pointer">
                  Certification <ChevronDown className="w-4 h-4" />
                </h4>
                <div className="space-y-3">
                  {['GOTS', 'OEKO-TEX', 'GRS', 'Bluesign'].map(f => (
                    <label key={f} className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-5 h-5 border border-gray-300 rounded-[4px] flex items-center justify-center group-hover:border-[#0047ff]"></div>
                      <span className="text-gray-600 text-sm">{f}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Grid */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-black">Technical Catalog</h2>
              <div className="flex gap-4">
                {['All', 'Knit', 'Woven', 'Fleece'].map(cat => (
                  <button 
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`text-sm font-semibold px-4 py-2 rounded-full transition-colors ${activeCategory === cat ? 'bg-black text-white' : 'bg-transparent text-gray-500 hover:text-black'}`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {PRODUCTS.map(product => (
                <div key={product.id} className="bg-white border border-gray-100 rounded-xl overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
                  <div className="w-full aspect-[4/3] bg-gray-100 relative">
                    <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="bg-white/90 backdrop-blur text-[10px] font-bold uppercase tracking-widest px-3 py-1 text-black rounded-full">
                        {product.category}
                      </span>
                      <span className="bg-black/80 backdrop-blur text-[10px] font-bold uppercase tracking-widest px-3 py-1 text-white rounded-full">
                        {product.type}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-xl font-bold text-black mb-1">{product.title}</h3>
                    <p className="text-sm text-gray-500 mb-6 font-mono">SKU: {product.sku}</p>
                    
                    <div className="grid grid-cols-3 gap-4 mb-6 pt-6 border-t border-gray-100">
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">GSM</p>
                        <p className="text-sm font-bold text-black">{product.gsm}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">COMP</p>
                        <p className="text-sm font-bold text-black">{product.comp}</p>
                      </div>
                      <div>
                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">LEAD</p>
                        <p className="text-sm font-bold text-black">{product.lead}</p>
                      </div>
                    </div>
                    
                    <div className="mt-auto pt-4">
                      <Button className="w-full bg-black text-white hover:bg-gray-800 rounded-md font-bold text-xs uppercase tracking-wider">
                        Technical Data
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </section>

      {/* 3. Eco-Performance Series Highlight */}
      <section className="bg-[#111111] text-white mt-16 py-24">
        <div className="container mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-16 items-center">
           <div className="order-2 md:order-1 relative rounded-2xl overflow-hidden aspect-square md:aspect-auto md:h-full min-h-[400px]">
             <img src={heroImage} alt="Eco Performance" className="absolute inset-0 w-full h-full object-cover" />
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
        </div>
      </section>
    </div>
  );
}
