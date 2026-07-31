import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { supabase } from '@/lib/supabase';
import { Loader2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const buyerSchema = z.object({
  company_name: z.string().min(2, 'Company name is required'),
  contact_person: z.string().min(2, 'Contact person is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  address: z.string().optional(),
  country: z.string().optional(),
  payment_terms: z.string().optional(),
  shipping_terms: z.string().optional(),
});

type BuyerFormValues = z.infer<typeof buyerSchema>;

export function BuyerForm() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm<BuyerFormValues>({
    resolver: zodResolver(buyerSchema),
  });

  const onSubmit = async (data: BuyerFormValues) => {
    setIsLoading(true);
    setError(null);
    
    const { error } = await supabase
      .from('buyers')
      .insert([data]);

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      // Log audit trail could be done here or via DB trigger
      navigate('/dashboard/merchandiser/buyers');
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Link to="/dashboard/merchandiser/buyers" className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Add New Buyer</h1>
          <p className="text-sm text-gray-500 mt-1">Create a new client profile</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {error && (
          <div className="p-4 bg-red-50 border-b border-red-100 text-red-600 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Company Information</h3>
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Company Name *</label>
              <input
                {...register('company_name')}
                type="text"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20 focus:border-[#0047ff]"
              />
              {errors.company_name && <p className="mt-1 text-xs text-red-500">{errors.company_name.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Contact Person *</label>
              <input
                {...register('contact_person')}
                type="text"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20 focus:border-[#0047ff]"
              />
              {errors.contact_person && <p className="mt-1 text-xs text-red-500">{errors.contact_person.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Email Address *</label>
              <input
                {...register('email')}
                type="email"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20 focus:border-[#0047ff]"
              />
              {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Phone Number</label>
              <input
                {...register('phone')}
                type="text"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20 focus:border-[#0047ff]"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Address</label>
              <input
                {...register('address')}
                type="text"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20 focus:border-[#0047ff]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Country</label>
              <input
                {...register('country')}
                type="text"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20 focus:border-[#0047ff]"
              />
            </div>

            <div className="md:col-span-2 mt-4">
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">Business Terms</h3>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Payment Terms</label>
              <input
                {...register('payment_terms')}
                type="text"
                placeholder="e.g. Net 30, LC at sight"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20 focus:border-[#0047ff]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Shipping Terms</label>
              <input
                {...register('shipping_terms')}
                type="text"
                placeholder="e.g. FOB, CIF"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20 focus:border-[#0047ff]"
              />
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end space-x-3">
            <Link to="/dashboard/merchandiser/buyers">
              <Button type="button" variant="outline" className="px-6">Cancel</Button>
            </Link>
            <Button 
              type="submit" 
              disabled={isLoading}
              className="bg-[#0047ff] hover:bg-blue-700 text-white px-8"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2 inline" /> : null}
              Save Buyer
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
