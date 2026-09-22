import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Plus, Loader2, ArrowLeft, Trash2, Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const bomItemSchema = z.object({
  material: z.string().min(1, 'Material name is required'),
  category: z.string().min(1, 'Category is required'),
  color: z.string().optional(),
  unit: z.string().min(1, 'Unit is required'),
  required_qty: z.number().min(0.01, 'Quantity must be > 0'),
  estimated_cost: z.number().min(0, 'Cost must be >= 0'),
  supplier: z.string().optional(),
});

type BOMItemFormValues = z.infer<typeof bomItemSchema>;

export function BOMBuilder() {
  const { id } = useParams();
  const [items, setItems] = useState<any[]>([]);
  const [project, setProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);

  const { register, handleSubmit, reset } = useForm<BOMItemFormValues>({
    resolver: zodResolver(bomItemSchema),
    defaultValues: {
      required_qty: 0,
      estimated_cost: 0,
    }
  });

  const fetchData = async () => {
    setIsLoading(true);
    // Fetch Project
    const { data: projData } = await supabase.from('projects').select('order_number, product_name').eq('id', id).single();
    if (projData) setProject(projData);

    // Fetch BOM
    const { data: bomData } = await supabase.from('bill_of_materials').select('*').eq('project_id', id).order('created_at', { ascending: true });
    if (bomData) setItems(bomData);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onSubmit = async (data: BOMItemFormValues) => {
    const { error } = await supabase.from('bill_of_materials').insert([{
      ...data,
      project_id: id,
    }]);

    if (!error) {
      reset();
      setIsAdding(false);
      fetchData();
    }
  };

  const handleDelete = async (itemId: string) => {
    await supabase.from('bill_of_materials').delete().eq('id', itemId);
    fetchData();
  };

  const handleGeneratePOs = async () => {
    if (items.length === 0) return;
    setIsLoading(true);
    
    // Group by supplier (filter out those without supplier)
    const itemsWithSupplier = items.filter(i => i.supplier);
    const suppliers = [...new Set(itemsWithSupplier.map(i => i.supplier))];

    for (const supplier of suppliers) {
      const supplierItems = itemsWithSupplier.filter(i => i.supplier === supplier);
      const poNumber = `PO-${project?.order_number}-${supplier.substring(0, 3).toUpperCase()}-${Math.floor(Math.random() * 1000)}`;

      const { data: poData, error: poError } = await supabase.from('purchase_orders').insert([{
        project_id: id,
        po_number: poNumber,
        supplier: supplier,
        status: 'Draft'
      }]).select().single();

      if (poData && !poError) {
        const poItems = supplierItems.map(i => ({
          po_id: poData.id,
          bom_id: i.id,
          quantity: i.required_qty,
          unit_price: i.estimated_cost,
          total_price: i.required_qty * i.estimated_cost
        }));
        await supabase.from('purchase_order_items').insert(poItems);
      }
    }
    
    alert('Purchase Orders Generated Successfully!');
    setIsLoading(false);
  };

  const totalCost = items.reduce((sum, item) => sum + (item.required_qty * item.estimated_cost), 0);

  if (isLoading) {
    return <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-[#0047ff]" /></div>;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to={`/dashboard/projects/${id}`} className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Bill of Materials</h1>
            <p className="text-sm text-gray-500 mt-1">Project: {project?.order_number} - {project?.product_name}</p>
          </div>
        </div>
        
        <div className="flex space-x-3">
          <Button onClick={handleGeneratePOs} variant="outline" className="flex items-center text-gray-600 bg-gray-50 border-gray-200 hover:bg-gray-100">
            Generate POs
          </Button>
          <Button variant="outline" className="flex items-center text-gray-600">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button onClick={() => setIsAdding(!isAdding)} className="bg-[#0047ff] hover:bg-blue-700 text-white flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Add Material
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {isAdding && (
          <div className="p-6 bg-blue-50/50 border-b border-gray-100">
            <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Material *</label>
                <input {...register('material')} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20" placeholder="e.g. Cotton Yarn 20/2" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Category *</label>
                <select {...register('category')} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20 bg-white">
                  <option value="Yarn">Yarn</option>
                  <option value="Trims">Trims</option>
                  <option value="Packaging">Packaging</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Color</label>
                <input {...register('color')} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20" placeholder="e.g. Navy Blue" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Unit *</label>
                <input {...register('unit')} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20" placeholder="e.g. kg, pcs" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Required Qty *</label>
                <input type="number" step="0.01" {...register('required_qty', { valueAsNumber: true })} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Est. Unit Cost *</label>
                <input type="number" step="0.01" {...register('estimated_cost', { valueAsNumber: true })} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Supplier</label>
                <input {...register('supplier')} className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20" placeholder="Supplier Name" />
              </div>
              <div className="flex items-end space-x-2">
                <Button type="submit" className="w-full bg-[#0047ff] hover:bg-blue-700 text-white">Save Item</Button>
                <Button type="button" variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
              </div>
            </form>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Material / Category</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Color</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Qty</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Unit Cost</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Total</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Supplier</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500 text-sm">
                    No materials added to the BOM yet.
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-medium text-gray-900">{item.material}</p>
                      <p className="text-xs text-gray-500">{item.category}</p>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">{item.color || '-'}</td>
                    <td className="py-4 px-6 text-sm text-gray-600 text-right">
                      {item.required_qty} {item.unit}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600 text-right">${item.estimated_cost?.toFixed(2)}</td>
                    <td className="py-4 px-6 text-sm font-medium text-gray-900 text-right">
                      ${(item.required_qty * item.estimated_cost).toFixed(2)}
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">{item.supplier || '-'}</td>
                    <td className="py-4 px-6 text-right space-x-3">
                      <button className="text-gray-400 hover:text-red-600 transition-colors" title="Delete" onClick={() => handleDelete(item.id)}>
                        <Trash2 className="w-4 h-4 inline" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            {items.length > 0 && (
              <tfoot className="bg-gray-50">
                <tr>
                  <td colSpan={4} className="py-4 px-6 text-right font-bold text-gray-900">Total Estimated Cost:</td>
                  <td className="py-4 px-6 text-right font-bold text-[#0047ff]">${totalCost.toFixed(2)}</td>
                  <td colSpan={2}></td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>
    </div>
  );
}
