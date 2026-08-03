import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { AuthLayout } from '@/components/layout/AuthLayout';
import { Lock, Eye, EyeOff, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';


const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export function ResetPassword() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isVerifying, setIsVerifying] = useState(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we have a valid session (from the reset link)
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session) {
        // We might need to handle the hash fragments if Supabase hasn't processed them yet
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
          if (event === 'PASSWORD_RECOVERY' || (event === 'SIGNED_IN' && session)) {
            setIsVerifying(false);
          } else if (!session) {
            setError("Invalid or expired reset link. Please request a new one.");
            setIsVerifying(false);
          }
        });
        
        // If after a short timeout we still don't have a session or event, assume invalid
        setTimeout(() => {
          if (isVerifying) {
             setError("Invalid or expired reset link. Please request a new one.");
             setIsVerifying(false);
          }
        }, 3000);

        return () => subscription.unsubscribe();
      } else {
        setIsVerifying(false);
      }
    };
    
    checkSession();
  }, [isVerifying]);

  const { register, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormValues) => {
    setIsLoading(true);
    setError(null);
    
    const { error } = await supabase.auth.updateUser({
      password: data.password
    });

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      setSuccess(true);
      setIsLoading(false);
      
      // Auto redirect to login after a few seconds
      setTimeout(() => navigate('/login'), 3000);
    }
  };

  if (isVerifying) {
    return (
      <AuthLayout
        title="Verifying Link"
        subtitle="Please wait while we verify your request"
      >
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-slate-400 mb-4" />
          <p className="text-slate-500 text-sm">Authenticating your secure session...</p>
        </div>
      </AuthLayout>
    );
  }

  if (error && !success) {
    return (
      <AuthLayout
        title="Link Expired"
        subtitle="The password reset link is invalid or has expired"
      >
        <div className="flex flex-col py-4">
          <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center mb-6">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <p className="text-slate-600 text-sm mb-8 leading-relaxed">
            {error}
          </p>
          <Link to="/forgot-password" className="w-full">
            <button className="w-full bg-slate-900 hover:bg-slate-800 text-white rounded-xl py-2.5 px-4 font-semibold text-sm transition-colors">
              Request New Link
            </button>
          </Link>
        </div>
      </AuthLayout>
    );
  }

  if (success) {
    return (
      <AuthLayout
        title="Password updated"
        subtitle="Your account is now secure"
      >
        <div className="flex flex-col py-4">
          <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-6 h-6 text-emerald-600" />
          </div>
          <p className="text-slate-600 text-sm mb-8 leading-relaxed">
            Your password has been successfully reset. You can now use your new password to sign in.
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
      title="Create new password"
      subtitle="Please enter your new strong password below"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* New Password Field */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700">
            New password
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

        {/* Confirm Password Field */}
        <div className="space-y-1.5">
          <label className="block text-sm font-medium text-slate-700">
            Confirm password
          </label>
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-slate-600 transition-colors">
              <Lock className="w-4 h-4" />
            </div>
            <input
              {...register('confirmPassword')}
              type={showConfirmPassword ? 'text' : 'password'}
              autoComplete="new-password"
              className="w-full pl-10 pr-11 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400 focus:ring-4 focus:ring-slate-100 transition-all"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition-colors focus:outline-none"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-sm text-red-500 font-medium">
              {errors.confirmPassword.message}
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
            'Update password'
          )}
        </button>
      </form>
    </AuthLayout>
  );
}
