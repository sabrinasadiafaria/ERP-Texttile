import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { supabase } from '@/lib/supabase';
import { Loader2, ArrowLeft } from 'lucide-react';

const projectSchema = z.object({
  buyer_id: z.string().min(1, 'Please select a buyer'),
  order_number: z.string().min(1, 'Order number is required'),
  style_number: z.string().optional(),
  product_name: z.string().min(1, 'Product name is required'),
  category: z.string().optional(),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
  gauge: z.string().optional(),
  yarn_type: z.string().optional(),
  stitch_type: z.string().optional(),
  machine_type: z.string().optional(),
  delivery_date: z.string().min(1, 'Delivery date is required'),
  priority: z.string().min(1),
  special_instructions: z.string().optional(),
});

type ProjectFormValues = z.infer<typeof projectSchema>;

export function ProjectWizard() {
  const [buyers, setBuyers] = useState<{id: string, company_name: string}[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.from('buyers').select('id, company_name').eq('status', 'active')
      .then(({ data }) => setBuyers(data || []));
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      quantity: 0,
      priority: 'Medium',
    }
  });

  const onSubmit = async (data: ProjectFormValues) => {
    setIsLoading(true);
    setError(null);
    
    // Convert string to null for optional empty fields if needed, or pass as is
    const { error } = await supabase
      .from('projects')
      .insert([data]);

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      navigate('/dashboard/projects');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Link to="/dashboard/projects" className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Create Production Project</h1>
          <p className="text-sm text-gray-500 mt-1">Enter the details from the buyer's Purchase Order</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {error && (
          <div className="p-4 bg-red-50 border-b border-red-100 text-red-600 text-sm">
            {error}
          </div>
        )}

        <div className="p-6 space-y-8">
          
          {/* Section 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <h3 className="text-sm font-semibold text-[#0047ff] uppercase tracking-wider mb-2">1. Order Information</h3>
              <hr className="border-gray-100 mb-4" />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Buyer *</label>
              <select 
                {...register('buyer_id')}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20 focus:border-[#0047ff] bg-white"
              >
                <option value="">Select Buyer...</option>
                {buyers.map(b => <option key={b.id} value={b.id}>{b.company_name}</option>)}
              </select>
              {errors.buyer_id && <p className="mt-1 text-xs text-red-500">{errors.buyer_id.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Order Number (PO) *</label>
              <input
                {...register('order_number')}
                type="text"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20 focus:border-[#0047ff]"
              />
              {errors.order_number && <p className="mt-1 text-xs text-red-500">{errors.order_number.message}</p>}
            </div>
          </div>

          {/* Section 2 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-3 mt-4">
              <h3 className="text-sm font-semibold text-[#0047ff] uppercase tracking-wider mb-2">2. Product Details</h3>
              <hr className="border-gray-100 mb-4" />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Product Name *</label>
              <input
                {...register('product_name')}
                type="text"
                placeholder="e.g. Men's Basic Crew Neck Sweater"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20 focus:border-[#0047ff]"
              />
              {errors.product_name && <p className="mt-1 text-xs text-red-500">{errors.product_name.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Category</label>
              <select 
                {...register('category')}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20 focus:border-[#0047ff] bg-white"
              >
                <option value="Sweater">Sweater</option>
                <option value="Cardigan">Cardigan</option>
                <option value="Pullover">Pullover</option>
                <option value="Vest">Vest</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Style Number</label>
              <input
                {...register('style_number')}
                type="text"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20 focus:border-[#0047ff]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Total Quantity *</label>
              <input
                {...register('quantity', { valueAsNumber: true })}
                type="number"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20 focus:border-[#0047ff]"
              />
              {errors.quantity && <p className="mt-1 text-xs text-red-500">{errors.quantity.message}</p>}
            </div>
          </div>

          {/* Section 3 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-4 mt-4">
              <h3 className="text-sm font-semibold text-[#0047ff] uppercase tracking-wider mb-2">3. Technical Specifications</h3>
              <hr className="border-gray-100 mb-4" />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Gauge</label>
              <input
                {...register('gauge')}
                type="text"
                placeholder="e.g. 12GG"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20 focus:border-[#0047ff]"
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Yarn Type</label>
              <input
                {...register('yarn_type')}
                type="text"
                placeholder="e.g. 100% Cotton"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20 focus:border-[#0047ff]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Stitch Type</label>
              <input
                {...register('stitch_type')}
                type="text"
                placeholder="e.g. Jersey"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20 focus:border-[#0047ff]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Machine Type</label>
              <input
                {...register('machine_type')}
                type="text"
                placeholder="e.g. Jacquard"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20 focus:border-[#0047ff]"
              />
            </div>
          </div>

          {/* Section 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2 mt-4">
              <h3 className="text-sm font-semibold text-[#0047ff] uppercase tracking-wider mb-2">4. Scheduling & Priority</h3>
              <hr className="border-gray-100 mb-4" />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Delivery Date *</label>
              <input
                {...register('delivery_date')}
                type="date"
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20 focus:border-[#0047ff]"
              />
              {errors.delivery_date && <p className="mt-1 text-xs text-red-500">{errors.delivery_date.message}</p>}
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Priority Level</label>
              <select 
                {...register('priority')}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20 focus:border-[#0047ff] bg-white"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Special Instructions</label>
              <textarea
                {...register('special_instructions')}
                rows={3}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20 focus:border-[#0047ff]"
              ></textarea>
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end space-x-3">
          <Link to="/dashboard/projects">
            <Button type="button" variant="outline" className="px-6">Cancel</Button>
          </Link>
          <Button 
            type="submit" 
            disabled={isLoading}
            className="bg-[#0047ff] hover:bg-blue-700 text-white px-8"
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin mr-2 inline" /> : null}
            Create Project
          </Button>
        </div>
      </form>
    </div>
  );
}
