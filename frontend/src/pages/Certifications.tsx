import { ShieldCheck, FileText, Globe2, Award, Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const CERTIFICATIONS = [
  {
    title: 'OEKO-TEX® Standard 100',
    category: 'Product Safety',
    desc: 'Certifies that all components of our products are tested for harmful substances and are harmless to human ecological health.',
    valid: '2025',
    icon: ShieldCheck,
  },
  {
    title: 'GOTS (Global Organic Textile Standard)',
    category: 'Organic Integrity',
    desc: 'The worldwide leading textile processing standard for organic fibers, including ecological and social criteria, backed by independent certification.',
    valid: '2025',
    icon: Globe2,
  },
  {
    title: 'BSCI (Business Social Compliance Initiative)',
    category: 'Social Compliance',
    desc: 'Ensures the continuous improvement of social performance in our supply chain, focusing on labor rights, health, and safety.',
    valid: '2025',
    icon: Award,
  },
  {
    title: 'ISO 9001:2015',
    category: 'Quality Management',
    desc: 'International standard for quality management systems. Demonstrates our ability to consistently provide products that meet customer and regulatory requirements.',
    valid: '2026',
    icon: FileText,
  },
  {
    title: 'WRAP (Worldwide Responsible Accredited Production)',
    category: 'Ethical Production',
    desc: 'Gold certificate demonstrating our commitment to safe, lawful, humane, and ethical manufacturing practices.',
    valid: '2025',
    icon: Award,
  },
  {
    title: 'GRS (Global Recycled Standard)',
    category: 'Environmental',
    desc: 'Verifies the recycled content of our products and responsible social, environmental, and chemical practices in their production.',
    valid: '2025',
    icon: Globe2,
  }
];

export function Certifications() {
  return (
    <div className="w-full font-sans bg-[#f4f5f7] pt-24 pb-24 text-black">
      
      {/* 1. Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl text-center">
          <p className="text-[#0047ff] font-bold text-xs uppercase tracking-widest mb-6">Compliance & Standards</p>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-8">
            Global Certifications
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-12">
            Transparency is the foundation of trust. Our facilities and products are independently audited by the world's most rigorous regulatory bodies, ensuring every garment we produce meets the highest global standards for quality, ethics, and sustainability.
          </p>
          <Button className="bg-black hover:bg-black/80 text-white rounded-md font-bold px-8 py-6 flex items-center mx-auto gap-2">
            <Download className="w-5 h-5" /> Download Compliance Audit Report
          </Button>
        </div>
      </section>

      {/* 2. Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-8 max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CERTIFICATIONS.map((cert, i) => (
              <div key={i} className="bg-white p-10 rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-shadow relative overflow-hidden group">
                {/* Background decorative icon */}
                <cert.icon className="absolute -right-8 -bottom-8 w-48 h-48 text-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" strokeWidth={1} />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="w-14 h-14 bg-blue-50 text-[#0047ff] rounded-xl flex items-center justify-center mb-6">
                    <cert.icon className="w-7 h-7" />
                  </div>
                  <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-2">{cert.category}</p>
                  <h3 className="text-2xl font-bold mb-4">{cert.title}</h3>
                  <p className="text-gray-500 leading-relaxed mb-8 flex-1">{cert.desc}</p>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                    <div>
                      <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-1">Valid Through</p>
                      <p className="font-mono font-bold text-black">{cert.valid}</p>
                    </div>
                    <button className="text-xs font-bold uppercase tracking-widest text-[#0047ff] hover:text-blue-800 transition-colors">
                      View Certificate
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Assurance Footer */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
           <div className="bg-white p-12 rounded-3xl border border-gray-200 shadow-sm flex flex-col items-center">
             <ShieldCheck className="w-16 h-16 text-[#0047ff] mb-6" />
             <h3 className="text-2xl font-bold mb-4">Continuous Monitoring</h3>
             <p className="text-gray-500 mb-8 max-w-xl">Our dedicated compliance team conducts daily internal audits alongside annual independent assessments to ensure zero-tolerance adherence to all international labor and safety laws.</p>
             <p className="font-mono text-sm font-bold">compliance@alaminexport.com</p>
           </div>
        </div>
      </section>

    </div>
  );
}
