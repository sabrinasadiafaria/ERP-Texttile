import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Mail, Lock, Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function Login() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  // Load remembered email on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem('texttile_remember_email');
    if (savedEmail) {
      setValue('email', savedEmail);
      setRememberMe(true);
    }
  }, [setValue]);

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);

    // Save or clear remembered email
    if (rememberMe) {
      localStorage.setItem('texttile_remember_email', data.email);
    } else {
      localStorage.removeItem('texttile_remember_email');
    }
    
    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      navigate('/dashboard', { replace: true });
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to your account to continue"
      bgImage="/login-bg.png"
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
          <div className="flex justify-between items-center">
            <label className="block text-sm font-medium text-slate-700">
              Password
            </label>
            <Link 
              to="/forgot-password" 
              className="text-sm text-slate-500 hover:text-slate-900 font-medium transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-slate-600 transition-colors">
              <Lock className="w-4 h-4" />
            </div>
            <input
              {...register('password')}
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
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

        {/* Remember Me Option */}
        <div className="flex items-center pt-1">
          <label className="flex items-center space-x-2.5 cursor-pointer group">
            <div className="relative flex items-center justify-center w-4 h-4">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
                className="peer sr-only"
              />
              <div className="w-4 h-4 border border-slate-300 rounded peer-checked:bg-slate-900 peer-checked:border-slate-900 transition-colors group-hover:border-slate-400" />
              <svg
                className={`absolute w-3 h-3 text-white pointer-events-none transition-opacity ${rememberMe ? 'opacity-100' : 'opacity-0'}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
              Remember me
            </span>
          </label>
        </div>

        {/* Submit Primary Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-2.5 px-4 font-semibold text-sm shadow-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      {/* Switch to Signup */}
      <div className="mt-8 text-center">
        <p className="text-sm text-slate-500">
          Don't have an account?{' '}
          <Link 
            to="/signup" 
            className="text-slate-900 font-semibold hover:underline ml-1"
          >
            Sign up
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
