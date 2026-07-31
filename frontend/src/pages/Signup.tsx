import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';

export function Signup() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/5 py-24 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card p-10 rounded-3xl shadow-xl border border-border/50 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold font-heading mb-2">Create an Account</h1>
          <p className="text-muted-foreground">Join TextTile to manage your supply chain.</p>
        </div>

        <form className="flex flex-col space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-foreground">Full Name</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Alex Sterling" 
              className="w-full bg-secondary/5 border-transparent focus:bg-background focus:ring-1 focus:border-accent focus:ring-accent rounded-xl px-4 py-3 text-sm transition-colors outline-none" 
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-foreground">Email Address</label>
            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="you@company.com" 
              className="w-full bg-secondary/5 border-transparent focus:bg-background focus:ring-1 focus:border-accent focus:ring-accent rounded-xl px-4 py-3 text-sm transition-colors outline-none" 
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label className="text-sm font-medium text-foreground">Password</label>
            <input 
              type="password" 
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              placeholder="••••••••" 
              className="w-full bg-secondary/5 border-transparent focus:bg-background focus:ring-1 focus:border-accent focus:ring-accent rounded-xl px-4 py-3 text-sm transition-colors outline-none" 
            />
          </div>

          <Button type="submit" size="lg" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-base font-bold rounded-xl mt-4">
            Sign Up
          </Button>
        </form>

        <p className="text-sm text-center text-muted-foreground mt-8">
          Already have an account? <Link to="/login" className="text-accent font-semibold hover:underline">Log in</Link>
        </p>
      </motion.div>
    </div>
  );
}
