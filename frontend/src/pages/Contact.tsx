import { motion } from 'framer-motion';
import { useState } from 'react';
import { Container } from '@/components/ui/Container';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CTASection } from '@/components/ui/CTASection';
import { Button } from '@/components/ui/Button';
import { Clock, MessageSquare, MapPin, Loader2, CheckCircle } from 'lucide-react';
import heroImage from '@/assets/hero.png';

const LOCATIONS = [
  {
    hub: 'HEADQUARTERS',
    city: 'Frankfurt',
    address: 'Opernplatz 14, 60313 Frankfurt am Main, Germany',
    time: 'CET (UTC+1)',
  },
  {
    hub: 'REGIONAL HUB',
    city: 'New York',
    address: '200 Greenwich St, New York, NY 10007, USA',
    time: 'EST (UTC-5)',
  },
  {
    hub: 'REGIONAL HUB',
    city: 'Hong Kong',
    address: '1 Austin Rd W, West Kowloon, Hong Kong',
    time: 'HKT (UTC+8)',
  },
  {
    hub: 'REGIONAL HUB',
    city: 'Ho Chi Minh',
    address: '29 Le Duan St, District 1, Ho Chi Minh City, Vietnam',
    time: 'ICT (UTC+7)',
  }
];

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
    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', company: '', phone: '', subject: '', message: '' });
      setTimeout(() => setIsSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="Global Connectivity" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        
        <Container className="relative z-10 text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl"
          >
            <p className="text-accent text-sm font-semibold tracking-wider uppercase mb-4">Global Offices</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-heading tracking-tight text-white mb-6">
              Global Connectivity.<br />Local Presence.
            </h1>
            <p className="text-lg text-white/80 leading-relaxed">
              Connecting the world's most sophisticated brands with advanced textile engineering centers across four continents.
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Main Content (Contact Form & Info) */}
      <section className="py-24 bg-secondary/5">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
            
            {/* Left Side: Info */}
            <div className="flex flex-col space-y-8">
              <div>
                <h2 className="text-3xl font-bold font-heading text-secondary mb-4">Partner with Excellence</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our multi-departmental experts are ready to accelerate your supply chain. Select the appropriate channel to ensure your inquiry reaches the right technical team.
                </p>
              </div>
              
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 p-6 bg-card rounded-2xl border border-border/50 shadow-soft"
                >
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Priority Inquiry For Brand Partners</h4>
                    <p className="text-sm text-muted-foreground">Guaranteed global mailbox routing within 4 hours.</p>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="flex items-start gap-4 p-6 bg-card rounded-2xl border border-border/50 shadow-soft"
                >
                  <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">Immediate Assistance</h4>
                    <p className="text-sm text-muted-foreground">
                      Visit our <a href="#" className="text-accent hover:underline">Live Support</a> or check the <a href="#" className="text-accent hover:underline">Technical FAQ</a>.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Right Side: Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card p-8 md:p-10 rounded-3xl shadow-xl border border-border/50"
            >
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center text-center h-full py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mb-6" />
                  <h3 className="text-2xl font-bold font-heading mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground">Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                  <Button className="mt-8" onClick={() => setIsSuccess(false)}>Send Another Message</Button>
                </div>
              ) : (
                <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col space-y-1">
                      <label className="text-sm font-medium text-foreground">Name *</label>
                      <input 
                        type="text" 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className={`w-full bg-secondary/5 border-transparent focus:bg-background focus:ring-1 rounded-xl px-4 py-3 text-sm transition-colors outline-none ${errors.name ? 'ring-1 ring-red-500 focus:border-red-500 focus:ring-red-500' : 'focus:border-accent focus:ring-accent'}`} 
                      />
                      {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label className="text-sm font-medium text-foreground">Email *</label>
                      <input 
                        type="email" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className={`w-full bg-secondary/5 border-transparent focus:bg-background focus:ring-1 rounded-xl px-4 py-3 text-sm transition-colors outline-none ${errors.email ? 'ring-1 ring-red-500 focus:border-red-500 focus:ring-red-500' : 'focus:border-accent focus:ring-accent'}`} 
                      />
                      {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="flex flex-col space-y-1">
                      <label className="text-sm font-medium text-foreground">Company</label>
                      <input 
                        type="text" 
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="w-full bg-secondary/5 border-transparent focus:bg-background focus:border-accent focus:ring-1 focus:ring-accent rounded-xl px-4 py-3 text-sm transition-colors outline-none" 
                      />
                    </div>
                    <div className="flex flex-col space-y-1">
                      <label className="text-sm font-medium text-foreground">Phone</label>
                      <input 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-secondary/5 border-transparent focus:bg-background focus:border-accent focus:ring-1 focus:ring-accent rounded-xl px-4 py-3 text-sm transition-colors outline-none" 
                      />
                    </div>
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-sm font-medium text-foreground">Subject *</label>
                    <select 
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className={`w-full bg-secondary/5 border-transparent focus:bg-background focus:ring-1 rounded-xl px-4 py-3 text-sm transition-colors outline-none appearance-none ${errors.subject ? 'ring-1 ring-red-500 focus:border-red-500 focus:ring-red-500' : 'focus:border-accent focus:ring-accent'}`}
                    >
                      <option value="">Select a subject...</option>
                      <option value="sales">Sales & Partnerships</option>
                      <option value="support">Technical Support</option>
                      <option value="general">General Inquiry</option>
                    </select>
                    {errors.subject && <span className="text-xs text-red-500">{errors.subject}</span>}
                  </div>

                  <div className="flex flex-col space-y-1">
                    <label className="text-sm font-medium text-foreground">Message *</label>
                    <textarea 
                      rows={4} 
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className={`w-full bg-secondary/5 border-transparent focus:bg-background focus:ring-1 rounded-xl px-4 py-3 text-sm transition-colors outline-none resize-none ${errors.message ? 'ring-1 ring-red-500 focus:border-red-500 focus:ring-red-500' : 'focus:border-accent focus:ring-accent'}`}
                    ></textarea>
                    {errors.message && <span className="text-xs text-red-500">{errors.message}</span>}
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-base font-bold rounded-xl mt-2 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2"><Loader2 className="w-5 h-5 animate-spin" /> Sending...</span>
                    ) : (
                      'Submit Request →'
                    )}
                  </Button>
                  
                  <p className="text-xs text-center text-muted-foreground mt-4">
                    Industrial-Grade Data Security. Your data is encrypted.
                  </p>
                </form>
              )}
            </motion.div>

          </div>
        </Container>
      </section>

      {/* Global Footprint */}
      <section className="py-24 bg-background">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <SectionHeader
              title="Our Global Footprint"
              description="Strategic hubs positioned for rapid response and distribution."
              align="left"
              className="mb-0 max-w-xl"
            />
            <Button variant="outline" size="sm" className="hidden md:flex rounded-full px-6">
              <MapPin className="w-4 h-4 mr-2" />
              See Interactive Map
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {LOCATIONS.map((loc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card p-6 rounded-2xl border border-border/50 shadow-soft hover:shadow-md transition-shadow flex flex-col h-full"
              >
                <div className="text-xs font-bold text-accent uppercase tracking-wider mb-2">{loc.hub}</div>
                <h4 className="text-xl font-heading font-bold text-foreground mb-4">{loc.city}</h4>
                <p className="text-sm text-muted-foreground flex-1 mb-6 leading-relaxed">
                  {loc.address}
                </p>
                <div className="text-sm font-medium text-foreground bg-secondary/5 inline-flex items-center px-3 py-1.5 rounded-lg w-fit">
                  {loc.time}
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Google Maps Placeholder */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-full h-[400px] bg-secondary/10 border border-border/50 rounded-3xl flex flex-col items-center justify-center text-muted-foreground"
          >
            <MapPin className="w-12 h-12 mb-4 opacity-50" />
            <p className="text-lg font-medium">Interactive Global Map</p>
            <p className="text-sm opacity-70">Google Maps Integration Pending</p>
          </motion.div>
        </Container>
      </section>

      {/* CTA Section */}
      <CTASection
        headline="Ready for a technical breakdown?"
        description="Book a 30-minute deep-dive with our principal textile engineers to discuss your R&D roadmap and material requirements."
        primaryCtaText="Schedule Consultation"
        secondaryCtaText="Download Specs Book"
      />
    </div>
  );
}
