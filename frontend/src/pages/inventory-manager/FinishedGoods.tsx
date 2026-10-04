import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, Archive, Inbox } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { productionService } from '@/lib/services/productionService';
import { useAuth } from '@/contexts/AuthContext';

export function FinishedGoods() {
  const { profile } = useAuth();
  const [data, setData] = useState<any[]>([]);
  const [incomingTransfers, setIncomingTransfers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { data: goods } = await supabase
        .from('finished_goods')
        .select('*, projects(order_number, product_name)')
        .order('created_at', { ascending: false });
      setData(goods || []);

      const transfers = await productionService.getIncomingTransfers('Inventory');
      setIncomingTransfers(transfers || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAcceptTransfer = async (transferId: string, projectId: string, quantity: number) => {
    if (!profile?.id) return;
    try {
      // Accept the transfer; a DB trigger adds the finished_goods row.
      await supabase.from('production_transfers').update({
        status: 'ACCEPTED', accepted_quantity: quantity, accepted_by: profile.id, accepted_at: new Date().toISOString(),
      }).eq('id', transferId);
      await supabase.from('production_records').insert({
        project_id: projectId, department: 'Inventory', input_quantity: quantity,
        planned_quantity: quantity, status: 'COMPLETED', created_by: profile.id,
      });
      
      fetchData();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Finished Goods Warehouse</h1>
          <p className="text-sm text-gray-500 mt-1">Manage completed products packed and ready for shipment.</p>
        </div>
      </div>

      {incomingTransfers.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-blue-200 overflow-hidden mb-6">
          <div className="p-4 bg-blue-50 border-b border-blue-100 flex items-center text-blue-800">
            <Inbox className="w-5 h-5 mr-2" />
            <h2 className="font-bold">Incoming from Packaging</h2>
          </div>
          <div className="p-4 divide-y">
            {incomingTransfers.map(t => (
              <div key={t.id} className="py-3 flex justify-between items-center">
                <div>
                  <p className="font-semibold text-sm">Project: {t.projects?.order_number}</p>
                  <p className="text-xs text-gray-500">Qty: {t.quantity}</p>
                </div>
                <Button onClick={() => handleAcceptTransfer(t.id, t.project_id, t.quantity)} size="sm" className="bg-[#0047ff]">
                  Receive Goods
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between bg-gray-50/50">
          <div className="flex space-x-4">
             <div className="flex items-center text-sm text-gray-500">
                <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
                Stored
             </div>
             <div className="flex items-center text-sm text-gray-500">
                <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></span>
                Reserved
             </div>
             <div className="flex items-center text-sm text-gray-500">
                <span className="w-3 h-3 rounded-full bg-green-500 mr-2"></span>
                Ready For Shipment
             </div>
          </div>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-[#0047ff]" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date Received</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project Number</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(item.created_at).toLocaleDateString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.projects?.order_number}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.projects?.product_name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.total_quantity} units</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-green-100 text-green-800`}>
                          In Stock
                        </span>
                      </td>
                    </tr>
                  ))}
                  {data.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                        <Archive className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm font-medium text-gray-900">No finished goods found.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
