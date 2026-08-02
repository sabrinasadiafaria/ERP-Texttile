import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Mail, Loader2, AlertCircle, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export function ForgotPassword() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormValues) => {
    setIsLoading(true);
    setError(null);
    
    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }
    setIsLoading(false);
  };

  if (success) {
    return (
      <AuthLayout
        title="Check your email"
        subtitle="Password reset link sent successfully"
      >
        <div className="flex flex-col py-4">
          <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-6">
            <Send className="w-5 h-5 text-slate-600 -ml-1" />
          </div>
          <p className="text-slate-600 text-sm mb-8 leading-relaxed">
            We've sent a password reset link to your email address. Please check your inbox and spam folder.
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
      title="Reset password"
      subtitle="Enter your email to receive a password reset link"
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

        {/* Submit Primary Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-6 bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-2.5 px-4 font-semibold text-sm shadow-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            'Send reset link'
          )}
        </button>
      </form>

      {/* Switch to Login */}
      <div className="mt-8 text-center">
        <p className="text-sm text-slate-500">
          Remember your password?{' '}
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
