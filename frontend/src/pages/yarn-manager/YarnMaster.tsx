import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Search, Loader2, Plus, Edit2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const yarnSchema = z.object({
  yarn_code: z.string().min(1, 'Code is required'),
  yarn_type: z.string().min(1, 'Type is required'),
  count: z.string().optional(),
  composition: z.string().optional(),
  brand: z.string().optional(),
  unit: z.string().min(1, 'Unit is required'),
});

type YarnFormValues = z.infer<typeof yarnSchema>;

export function YarnMaster() {
  const [yarns, setYarns] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<YarnFormValues>({
    resolver: zodResolver(yarnSchema),
    defaultValues: { unit: 'kg' }
  });

  useEffect(() => {
    fetchYarns();
  }, []);

  const fetchYarns = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from('yarn_master').select('*').order('created_at', { ascending: false });
    if (!error && data) setYarns(data);
    setIsLoading(false);
  };

  const onSubmit = async (data: YarnFormValues) => {
    const { error } = await supabase.from('yarn_master').insert([data]);
    if (!error) {
      reset();
      setIsAdding(false);
      fetchYarns();
    } else {
      alert('Failed to add yarn master record. Code might already exist.');
    }
  };

  const filteredYarns = yarns.filter(y => 
    y.yarn_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    y.yarn_type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Yarn Master</h1>
          <p className="text-sm text-gray-500 mt-1">Manage yarn catalog and specifications</p>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)} className="bg-[#0047ff] hover:bg-blue-700 text-white flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Yarn
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {isAdding && (
          <div className="p-6 bg-blue-50/50 border-b border-gray-100">
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Code *</label>
                <input {...register('yarn_code')} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20" placeholder="e.g. YRN-C20" />
                {errors.yarn_code && <p className="text-red-500 text-xs mt-1">{errors.yarn_code.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Type *</label>
                <input {...register('yarn_type')} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20" placeholder="e.g. Cotton" />
                {errors.yarn_type && <p className="text-red-500 text-xs mt-1">{errors.yarn_type.message}</p>}
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Count</label>
                <input {...register('count')} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20" placeholder="e.g. 20/2" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Composition</label>
                <input {...register('composition')} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20" placeholder="e.g. 100% Cotton" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Brand</label>
                <input {...register('brand')} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20" placeholder="e.g. BEXIMCO" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Unit</label>
                <input {...register('unit')} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20" placeholder="kg" />
              </div>
              <div className="flex items-end space-x-2 md:col-span-2 justify-end">
                <Button type="button" variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
                <Button type="submit" className="bg-[#0047ff] hover:bg-blue-700 text-white">Save Yarn</Button>
              </div>
            </form>
          </div>
        )}

        <div className="p-4 border-b border-gray-100 flex items-center">
          <div className="relative w-full max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by code or type..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Code</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Type & Composition</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Count</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Brand</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Unit</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center">
                    <Loader2 className="w-6 h-6 animate-spin text-gray-400 mx-auto" />
                  </td>
                </tr>
              ) : filteredYarns.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500 text-sm">
                    No yarn records found.
                  </td>
                </tr>
              ) : (
                filteredYarns.map((yarn) => (
                  <tr key={yarn.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-medium text-gray-900">{yarn.yarn_code}</td>
                    <td className="py-4 px-6">
                      <p className="text-sm font-medium text-gray-900">{yarn.yarn_type}</p>
                      <p className="text-xs text-gray-500">{yarn.composition}</p>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">{yarn.count || '-'}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{yarn.brand || '-'}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{yarn.unit}</td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button className="text-gray-400 hover:text-[#0047ff] transition-colors" title="Edit">
                        <Edit2 className="w-4 h-4 inline" />
                      </button>
                      <button className="text-gray-400 hover:text-red-600 transition-colors" title="Delete">
                        <Trash2 className="w-4 h-4 inline" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
