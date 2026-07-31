import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Search, Loader2, FileText, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const kpoSchema = z.object({
  kpo_number: z.string().min(1, 'KPO number is required'),
  project_id: z.string().min(1, 'Project is required'),
  machine: z.string().min(1, 'Machine is required'),
  gauge: z.string().min(1, 'Gauge is required'),
  delivery_date: z.string().min(1, 'Delivery date is required'),
});

type KPOFormValues = z.infer<typeof kpoSchema>;

export function KPOGeneration() {
  const [kpos, setKpos] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const { register, handleSubmit, reset, formState: { errors } } = useForm<KPOFormValues>({
    resolver: zodResolver(kpoSchema),
    defaultValues: {
      kpo_number: `KPO-${Math.floor(Math.random() * 10000)}`
    }
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    const { data: kposData } = await supabase
      .from('knitting_production_orders')
      .select('*, projects(order_number, product_name, buyers(company_name))')
      .order('created_at', { ascending: false });
    if (kposData) setKpos(kposData);

    const { data: projData } = await supabase.from('projects').select('id, order_number').neq('status', 'Completed');
    if (projData) setProjects(projData);

    setIsLoading(false);
  };

  const onSubmit = async (data: KPOFormValues) => {
    const { error } = await supabase.from('knitting_production_orders').insert([{
      ...data,
      status: 'Draft'
    }]);

    if (!error) {
      reset({ kpo_number: `KPO-${Math.floor(Math.random() * 10000)}` });
      setIsAdding(false);
      fetchData();
    } else {
      alert('Error creating KPO. Make sure KPO number is unique.');
    }
  };

  const filteredKpos = kpos.filter(kpo => 
    kpo.kpo_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    kpo.projects?.order_number?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Knitting Production Orders</h1>
          <p className="text-sm text-gray-500 mt-1">Generate and manage KPOs for knitting floor</p>
        </div>
        <Button onClick={() => setIsAdding(!isAdding)} className="bg-[#0047ff] hover:bg-blue-700 text-white flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Generate KPO
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {isAdding && (
          <div className="p-6 bg-blue-50/50 border-b border-gray-100">
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">KPO Number *</label>
                <input {...register('kpo_number')} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20" />
                {errors.kpo_number && <p className="text-red-500 text-xs mt-1">{errors.kpo_number.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Project *</label>
                <select {...register('project_id')} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20 bg-white">
                  <option value="">Select Project</option>
                  {projects.map(p => (
                    <option key={p.id} value={p.id}>{p.order_number}</option>
                  ))}
                </select>
                {errors.project_id && <p className="text-red-500 text-xs mt-1">{errors.project_id.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target Delivery Date *</label>
                <input {...register('delivery_date')} type="date" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20" />
                {errors.delivery_date && <p className="text-red-500 text-xs mt-1">{errors.delivery_date.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Machine Allocation *</label>
                <input {...register('machine')} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20" placeholder="e.g. M-101, M-102" />
                {errors.machine && <p className="text-red-500 text-xs mt-1">{errors.machine.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gauge *</label>
                <input {...register('gauge')} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20" placeholder="e.g. 12G" />
                {errors.gauge && <p className="text-red-500 text-xs mt-1">{errors.gauge.message}</p>}
              </div>
              <div className="flex items-end space-x-2">
                <Button type="submit" className="w-full bg-[#0047ff] hover:bg-blue-700 text-white">Save KPO</Button>
                <Button type="button" variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
              </div>
            </form>
          </div>
        )}

        <div className="p-4 border-b border-gray-100 flex items-center">
          <div className="relative w-full max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search KPO or Project..." 
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
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">KPO Number</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Project / Buyer</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Machine Specs</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Delivery Date</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
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
              ) : filteredKpos.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500 text-sm">
                    No KPOs found.
                  </td>
                </tr>
              ) : (
                filteredKpos.map((kpo) => (
                  <tr key={kpo.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-medium text-gray-900">{kpo.kpo_number}</td>
                    <td className="py-4 px-6">
                      <p className="text-sm font-medium text-gray-900">{kpo.projects?.order_number}</p>
                      <p className="text-xs text-gray-500">{kpo.projects?.buyers?.company_name}</p>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      <div>Machine: {kpo.machine}</div>
                      <div className="text-xs text-gray-400">Gauge: {kpo.gauge}</div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      {kpo.delivery_date ? new Date(kpo.delivery_date).toLocaleDateString() : '-'}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                        kpo.status === 'Completed' ? 'bg-green-100 text-green-800' :
                        kpo.status === 'Issued' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {kpo.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button className="text-gray-400 hover:text-[#0047ff] transition-colors" title="View Document">
                        <FileText className="w-5 h-5 inline" />
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
