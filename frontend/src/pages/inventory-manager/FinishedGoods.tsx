import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, Archive } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function FinishedGoods() {
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { data: goods } = await supabase
        .from('finished_goods_cartons')
        .select('*, finished_good:finished_goods(project:projects(name, project_code)), bin:warehouse_bins(name)')
        .order('received_date', { ascending: false });
      setData(goods || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    await supabase.from('finished_goods_cartons').update({ shipment_status: status }).eq('id', id);
    fetchData();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Finished Goods Warehouse</h1>
          <p className="text-sm text-gray-500 mt-1">Manage completed products packed and ready for shipment.</p>
        </div>
        <Button className="bg-[#0047ff] hover:bg-blue-700">Receive from Packing</Button>
      </div>

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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Carton Number</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Location (Bin)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.carton_number}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.finished_good?.project?.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantity} units</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.bin?.name || 'Unassigned'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                          ${item.shipment_status === 'Stored' ? 'bg-blue-100 text-blue-800' : 
                            item.shipment_status === 'Reserved' ? 'bg-yellow-100 text-yellow-800' :
                            item.shipment_status === 'Ready For Shipment' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {item.shipment_status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {item.shipment_status === 'Stored' && (
                          <button onClick={() => handleUpdateStatus(item.id, 'Reserved')} className="text-[#0047ff] hover:text-blue-900 mx-2">Reserve</button>
                        )}
                        {item.shipment_status === 'Reserved' && (
                          <button onClick={() => handleUpdateStatus(item.id, 'Ready For Shipment')} className="text-green-600 hover:text-green-900 mx-2">Set Ready</button>
                        )}
                        {item.shipment_status === 'Ready For Shipment' && (
                          <button onClick={() => handleUpdateStatus(item.id, 'Dispatched')} className="text-purple-600 hover:text-purple-900 mx-2">Dispatch</button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {data.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
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
