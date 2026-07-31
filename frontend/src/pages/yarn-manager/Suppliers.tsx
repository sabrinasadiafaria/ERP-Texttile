import { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Plus, Search, Loader2, Edit2, Trash2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

export function SuppliersLayout() {
  return <Outlet />;
}

export function SuppliersList() {
  const [suppliers, setSuppliers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from('suppliers').select('*').order('created_at', { ascending: false });
    if (!error && data) setSuppliers(data);
    setIsLoading(false);
  };

  const filteredSuppliers = suppliers.filter(s => 
    s.company_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.supplier_code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Suppliers</h1>
          <p className="text-sm text-gray-500 mt-1">Manage yarn suppliers and vendors</p>
        </div>
        <Link to="/dashboard/yarn-manager/suppliers/new">
          <Button className="bg-[#0047ff] hover:bg-blue-700 text-white flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add Supplier
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100">
          <div className="relative max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search suppliers..." 
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
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Company Name</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Country</th>
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
              ) : filteredSuppliers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500 text-sm">No suppliers found.</td>
                </tr>
              ) : (
                filteredSuppliers.map((supplier) => (
                  <tr key={supplier.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-sm font-medium text-gray-900">{supplier.supplier_code}</td>
                    <td className="py-4 px-6 text-sm text-gray-900">{supplier.company_name}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      <div>{supplier.contact_person}</div>
                      <div className="text-xs text-gray-400">{supplier.email}</div>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">{supplier.country}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                        supplier.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {supplier.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      <button className="text-gray-400 hover:text-[#0047ff] transition-colors" title="Edit">
                        <Edit2 className="w-4 h-4 inline" />
                      </button>
                      <button className="text-gray-400 hover:text-red-600 transition-colors" title="Archive">
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

const supplierSchema = z.object({
  supplier_code: z.string().min(1, 'Code is required'),
  company_name: z.string().min(1, 'Company Name is required'),
  contact_person: z.string().optional(),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
  address: z.string().optional(),
  country: z.string().optional(),
  lead_time: z.number().optional(),
  payment_terms: z.string().optional(),
});

type SupplierFormValues = z.infer<typeof supplierSchema>;

export function SupplierForm() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<SupplierFormValues>({
    resolver: zodResolver(supplierSchema),
    defaultValues: { lead_time: 14 }
  });

  const onSubmit = async (data: SupplierFormValues) => {
    setIsSubmitting(true);
    const { error } = await supabase.from('suppliers').insert([data]);
    setIsSubmitting(false);
    if (!error) {
      navigate('/dashboard/yarn-manager/suppliers');
    } else {
      alert('Error creating supplier. Ensure code is unique.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center space-x-4">
        <Link to="/dashboard/yarn-manager/suppliers" className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Add New Supplier</h1>
          <p className="text-sm text-gray-500 mt-1">Enter supplier details for yarn procurement.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Supplier Code *</label>
              <input {...register('supplier_code')} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20" placeholder="e.g. SUP-001" />
              {errors.supplier_code && <p className="text-red-500 text-xs mt-1">{errors.supplier_code.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
              <input {...register('company_name')} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20" placeholder="e.g. Acme Yarns Ltd." />
              {errors.company_name && <p className="text-red-500 text-xs mt-1">{errors.company_name.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
              <input {...register('contact_person')} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input {...register('email')} type="email" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20" />
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <input {...register('phone')} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <input {...register('country')} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <textarea {...register('address')} rows={3} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lead Time (Days)</label>
              <input {...register('lead_time', { valueAsNumber: true })} type="number" className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Terms</label>
              <select {...register('payment_terms')} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20 bg-white">
                <option value="Net 30">Net 30</option>
                <option value="Net 60">Net 60</option>
                <option value="COD">COD</option>
                <option value="Advance">Advance</option>
              </select>
            </div>
          </div>
          
          <div className="flex justify-end pt-6 border-t border-gray-100">
            <Button type="submit" disabled={isSubmitting} className="bg-[#0047ff] hover:bg-blue-700 text-white min-w-[120px]">
              {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Save Supplier'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
