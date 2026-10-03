import { motion } from 'framer-motion';
import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { CTASection } from '@/components/ui/CTASection';
import { Button } from '@/components/ui/Button';
import { Clock, Mail, MapPin, Loader2, CheckCircle, ShieldCheck, Send, Sparkles, Building2 } from 'lucide-react';
import heroImage from '@/assets/hero.png';

// Asset Images (matching Sustainability page style)
import manufacturingHero from '@/assets/manufacturing-hero.jpg';
import greenFactory from '@/assets/green-factory.jpg';
import exportPackaging from '@/assets/export-packaging.png';

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.subject) newErrors.subject = 'Subject is required';
    if (!formData.message) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', company: '', phone: '', subject: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="w-full font-sans bg-zinc-950 text-white min-h-screen pt-20 overflow-hidden selection:bg-[#0047ff] selection:text-white">
      
      {/* 1. Hero Section */}
      <section className="relative min-h-[480px] flex items-center justify-center pt-16 pb-16 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img src={heroImage} alt="Al-Amin Export HQ" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/90 via-zinc-950/80 to-zinc-950" />
        
        {/* Glow sphere */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[130px] pointer-events-none" />

        <Container className="relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-[#4d79ff] text-xs font-semibold uppercase tracking-widest mb-6 backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#4d79ff]" />
            <span>Direct Manufacturer Contact</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6 text-white"
          >
            Get in Touch with Our <br className="hidden md:inline" />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-400 bg-clip-text text-transparent">
              Export Manufacturing Team
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed font-normal"
          >
            Connect directly with our merchandising, technical sampling, and production teams at our headquarters in Narayanganj, Bangladesh.
          </motion.p>
        </Container>
      </section>

      {/* 2. Main Content (Contact Info & Form) */}
      <section className="py-12 md:py-20 relative z-10">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-7xl mx-auto">
            
            {/* Left Side: Contact Information & Plant Image Card (5 cols) */}
            <div className="lg:col-span-5 flex flex-col space-y-6">
              
              <div>
                <span className="text-[#4d79ff] text-xs font-semibold uppercase tracking-widest block mb-2 font-mono">
                  Direct Channels
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                  Partner with Us
                </h2>
                <p className="text-zinc-400 text-sm mt-3 leading-relaxed">
                  Have an inquiry regarding sweater sampling, yarn sourcing, or volume production? Reach out to us directly through any of our channels below.
                </p>
              </div>

              {/* Plant Image Card (Sustainability Page Style) */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="relative aspect-[16/10] rounded-2xl overflow-hidden shadow-xl border border-zinc-800 group"
              >
                <img 
                  src={manufacturingHero} 
                  alt="Al-Amin Export Manufacturing Plant" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute top-3 left-3 px-3 py-1 bg-black/70 backdrop-blur-md rounded-full text-[11px] font-mono font-bold text-blue-400 border border-blue-500/30 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" /> Composite Plant
                </div>
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <p className="text-sm font-bold">Narayanganj Composite Facility</p>
                  <p className="text-xs text-zinc-300 font-mono">Al-Amin Centre, Madani Nagar, Sanarpar</p>
                </div>
              </motion.div>

              {/* Card 1: Address */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800/90 hover:border-[#0047ff]/40 transition-all duration-300 shadow-lg flex items-start gap-4"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[#4d79ff] shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-zinc-500 block mb-1">
                    Factory & Headquarters
                  </span>
                  <h4 className="font-bold text-white text-base mb-1">Al-Amin Centre</h4>
                  <p className="text-zinc-400 text-xs leading-relaxed">
                    Madani Nagar, Sanarpar, Siddirganj, Narayanganj, Bangladesh
                  </p>
                </div>
              </motion.div>

              {/* Card 2: Email */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800/90 hover:border-[#0047ff]/40 transition-all duration-300 shadow-lg flex items-start gap-4"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[#4d79ff] shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-zinc-500 block mb-1">
                    Official Email
                  </span>
                  <h4 className="font-bold text-white text-base mb-1">info@alaminexport.com</h4>
                  <p className="text-zinc-400 text-xs">
                    Guaranteed response from merchandising within 4 business hours.
                  </p>
                </div>
              </motion.div>

              {/* Card 3: Working Hours */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800/90 hover:border-[#0047ff]/40 transition-all duration-300 shadow-lg flex items-start gap-4"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-[#4d79ff] shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] font-mono font-semibold uppercase tracking-widest text-zinc-500 block mb-1">
                    Working Hours
                  </span>
                  <h4 className="font-bold text-white text-base mb-1">Sat – Thu: 8:00 AM – 6:00 PM</h4>
                  <p className="text-zinc-400 text-xs">
                    Bangladesh Standard Time (BST, UTC+6)
                  </p>
                </div>
              </motion.div>

              {/* Security Banner */}
              <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10 flex items-center gap-3 text-xs text-zinc-400">
                <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0" />
                <span>All communication & technical tech pack submissions are protected under NDA confidentiality.</span>
              </div>

            </div>

            {/* Right Side: Interactive Inquiry Form (7 cols) */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-7 bg-zinc-900/90 p-8 md:p-10 rounded-3xl border border-zinc-800 shadow-2xl backdrop-blur-md relative"
            >
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">Send Us a Direct Message</h3>
                <p className="text-zinc-400 text-sm">Fill in your specifications and our merchandising team will get back to you promptly.</p>
              </div>

              {isSuccess ? (
                <div className="flex flex-col items-center justify-center text-center py-16">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Received!</h3>
                  <p className="text-zinc-400 text-sm max-w-md">Thank you for reaching out. A dedicated merchandiser from Al-Amin Export Ltd. will contact you shortly.</p>
                  <Button className="mt-8 rounded-full bg-[#0047ff] hover:bg-blue-600 text-white font-semibold px-8" onClick={() => setIsSuccess(false)}>
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col space-y-2">
                      <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Your Name *</label>
                      <input 
                        type="text" 
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className={`w-full bg-zinc-950/80 border border-zinc-800 focus:border-[#0047ff] focus:ring-1 focus:ring-[#0047ff] rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-600 transition-all outline-none ${errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`} 
                      />
                      {errors.name && <span className="text-xs text-red-400">{errors.name}</span>}
                    </div>

                    <div className="flex flex-col space-y-2">
                      <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Email Address *</label>
                      <input 
                        type="email" 
                        placeholder="john@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className={`w-full bg-zinc-950/80 border border-zinc-800 focus:border-[#0047ff] focus:ring-1 focus:ring-[#0047ff] rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-600 transition-all outline-none ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`} 
                      />
                      {errors.email && <span className="text-xs text-red-400">{errors.email}</span>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col space-y-2">
                      <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Company / Brand Name</label>
                      <input 
                        type="text" 
                        placeholder="Fashion Apparel Ltd."
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="w-full bg-zinc-950/80 border border-zinc-800 focus:border-[#0047ff] focus:ring-1 focus:ring-[#0047ff] rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-600 transition-all outline-none" 
                      />
                    </div>

                    <div className="flex flex-col space-y-2">
                      <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Phone / WhatsApp</label>
                      <input 
                        type="tel" 
                        placeholder="+1 (555) 000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-zinc-950/80 border border-zinc-800 focus:border-[#0047ff] focus:ring-1 focus:ring-[#0047ff] rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-600 transition-all outline-none" 
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Inquiry Subject *</label>
                    <select 
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className={`w-full bg-zinc-950/80 border border-zinc-800 focus:border-[#0047ff] focus:ring-1 focus:ring-[#0047ff] rounded-xl px-4 py-3.5 text-sm text-white transition-all outline-none ${errors.subject ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                    >
                      <option value="" className="bg-zinc-900 text-zinc-400">Select inquiry type...</option>
                      <option value="sampling" className="bg-zinc-900 text-white">Sweater Sampling & CAD Tech Pack</option>
                      <option value="production" className="bg-zinc-900 text-white">Bulk Order & Production Capacity</option>
                      <option value="yarn" className="bg-zinc-900 text-white">Yarn & Gauge Specifications</option>
                      <option value="compliance" className="bg-zinc-900 text-white">Compliance & Audit Reports</option>
                      <option value="general" className="bg-zinc-900 text-white">General Business Inquiry</option>
                    </select>
                    {errors.subject && <span className="text-xs text-red-400">{errors.subject}</span>}
                  </div>

                  <div className="flex flex-col space-y-2">
                    <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Message / Project Details *</label>
                    <textarea 
                      rows={4} 
                      placeholder="Please share details such as desired product category, yarn preference, gauge, quantity, or target delivery timeframe..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className={`w-full bg-zinc-950/80 border border-zinc-800 focus:border-[#0047ff] focus:ring-1 focus:ring-[#0047ff] rounded-xl px-4 py-3.5 text-sm text-white placeholder-zinc-600 transition-all outline-none resize-none ${errors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                    ></textarea>
                    {errors.message && <span className="text-xs text-red-400">{errors.message}</span>}
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-[#0047ff] hover:bg-blue-600 text-white py-6 text-base font-bold rounded-xl mt-4 shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2 transition-all"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin" /> Submitting...</span>
                    ) : (
                      <span className="flex items-center gap-2">Submit Inquiry <Send className="w-4 h-4 ml-1" /></span>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>

          </div>
        </Container>
      </section>

      {/* 3. Facility & Shipping Showcase Banner (Matching Sustainability Page Style) */}
      <section className="py-16 bg-zinc-900/40 border-t border-zinc-800/80 relative z-10">
        <Container>
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="grid lg:grid-cols-12 gap-8 items-center bg-zinc-900 rounded-3xl p-8 md:p-10 border border-zinc-800 shadow-xl"
            >
              <div className="lg:col-span-7">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl border border-zinc-700/60 group"
                >
                  <img 
                    src={exportPackaging} 
                    alt="Export Packaging & Shipping Facility" 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3 px-3 py-1 bg-black/70 backdrop-blur-md rounded-full text-xs font-mono font-bold text-[#4d79ff] border border-blue-500/30">
                    Export Logistics & Shipment Hub
                  </div>
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <p className="text-sm font-bold">Export Packaging & Quality Check Hub</p>
                    <p className="text-xs text-zinc-300">Serving global fashion buyers with timely international dispatch</p>
                  </div>
                </motion.div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
                <span className="text-[#4d79ff] font-semibold text-xs uppercase tracking-widest font-mono">
                  Direct Factory Presence
                </span>
                <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                  Al-Amin Export Centre, Narayanganj
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Operating from a modern composite sweater factory in Narayanganj, Bangladesh equipped with computerized Japanese Shima Seiki machines.
                </p>

                <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 font-mono text-xs text-zinc-300">
                  Address: <span className="text-white font-bold">Al-Amin Centre, Madani Nagar, Sanarpar, Siddirganj, Narayanganj</span>
                  <br />
                  Email: <span className="text-[#4d79ff] font-bold">info@alaminexport.com</span>
                </div>
              </div>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <CTASection
        headline="Ready for a technical breakdown?"
        description="Book a technical deep-dive with our principal merchandising and CAD engineers to discuss your sweater design roadmap."
        primaryCtaText="Schedule Consultation"
        secondaryCtaText="Download Specs Book"
      />
    </div>
  );
}
