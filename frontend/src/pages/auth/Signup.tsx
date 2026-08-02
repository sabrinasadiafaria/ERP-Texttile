import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Mail, Lock, User, Eye, EyeOff, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const signupSchema = z.object({
  fullName: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type SignupFormValues = z.infer<typeof signupSchema>;

export function Signup() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormValues) => {
    setIsLoading(true);
    setError(null);
    
    // Note: The trigger handles profile creation, but we can pass meta data
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          full_name: data.fullName,
        }
      }
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      setSuccess(true);
      setIsLoading(false);
      // Auto redirect to login after a few seconds
      setTimeout(() => navigate('/login'), 4000);
    }
  };

  if (success) {
    return (
      <AuthLayout
        title="Account created"
        subtitle="Your request has been received"
        bgImage="/signup-bg.png"
      >
        <div className="flex flex-col py-4">
          <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          </div>
          <p className="text-slate-600 text-sm mb-8 leading-relaxed">
            Please check your email for a verification link, or wait for administrator approval to access your workspace.
          </p>
          <Link to="/login" className="w-full">
            <button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-2.5 px-4 font-semibold text-sm transition-colors">
              Return to Sign In
            </button>
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Register for access to TextTile ERP"
      bgImage="/signup-bg.png"
    >
      {/* Error Alert */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="mb-6 p-3.5 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm flex items-start space-x-3"
          >
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" />
            <div className="flex-1 leading-snug">{error}</div>
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Full Name Field */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700">
            Full name
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-slate-600 transition-colors">
              <User className="w-4 h-4" />
            </div>
            <input
              {...register('fullName')}
              type="text"
              autoComplete="name"
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100 transition-all"
              placeholder="John Doe"
            />
          </div>
          {errors.fullName && (
            <p className="text-sm text-red-500 font-medium">
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email Address Field */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700">
            Email address
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-slate-600 transition-colors">
              <Mail className="w-4 h-4" />
            </div>
            <input
              {...register('email')}
              type="email"
              autoComplete="email"
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100 transition-all"
              placeholder="you@example.com"
            />
          </div>
          {errors.email && (
            <p className="text-sm text-red-500 font-medium">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700">
            Password
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-slate-600 transition-colors">
              <Lock className="w-4 h-4" />
            </div>
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              className="w-full pl-10 pr-11 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100 transition-all"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-sm text-red-500 font-medium">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Primary Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-6 bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-2.5 px-4 font-semibold text-sm shadow-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            'Sign Up'
          )}
        </button>
      </form>

      {/* Switch to Login */}
      <div className="mt-8 text-center">
        <p className="text-sm text-slate-500">
          Already have an account?{' '}
          <Link 
            to="/login" 
            className="text-slate-900 font-semibold hover:underline ml-1"
          >
            Sign in
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
