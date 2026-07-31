import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Search, Loader2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export function PurchaseOrdersList() {
  const [pos, setPos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchPOs();
  }, []);

  const fetchPOs = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('purchase_orders')
      .select('*, projects(order_number)')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching POs:', error);
    } else {
      setPos(data || []);
    }
    setIsLoading(false);
  };

  const filteredPOs = pos.filter(po => 
    po.po_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    po.supplier.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Purchase Orders</h1>
          <p className="text-sm text-gray-500 mt-1">Manage supplier POs generated from BOMs</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center">
          <div className="relative w-full max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search POs or suppliers..." 
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
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">PO Number</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Supplier</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Project</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Deadline</th>
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
              ) : filteredPOs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500 text-sm">
                    No purchase orders found.
                  </td>
                </tr>
              ) : (
                filteredPOs.map((po) => (
                  <tr key={po.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-medium text-gray-900">{po.po_number}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{po.supplier}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      <Link to={`/dashboard/merchandiser/projects/${po.project_id}`} className="hover:text-[#0047ff] hover:underline">
                        {po.projects?.order_number}
                      </Link>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">{po.delivery_deadline ? new Date(po.delivery_deadline).toLocaleDateString() : '-'}</td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-yellow-100 text-yellow-800">
                        {po.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className="text-gray-400 hover:text-[#0047ff] transition-colors" title="View Details">
                        <Eye className="w-5 h-5 inline" />
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
