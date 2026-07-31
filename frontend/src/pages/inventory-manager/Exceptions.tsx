import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, CornerDownLeft, RefreshCcw, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Exceptions() {
  const [activeTab, setActiveTab] = useState<'returns' | 'adjustments'>('returns');
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (activeTab === 'returns') {
        const { data: returns } = await supabase
          .from('material_returns')
          .select('*, item:inventory_items(name)')
          .order('created_at', { ascending: false });
        setData(returns || []);
      } else {
        const { data: adjustments } = await supabase
          .from('stock_adjustments')
          .select('*, batch:inventory_batches(batch_number, item:inventory_items(name))')
          .order('created_at', { ascending: false });
        setData(adjustments || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdjustmentApproval = async (id: string, isApproved: boolean) => {
    await supabase.from('stock_adjustments').update({
      status: isApproved ? 'Approved' : 'Rejected'
    }).eq('id', id);
    // Real app: update inventory_batches with new_quantity here if Approved
    fetchData();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Exceptions & Adjustments</h1>
          <p className="text-sm text-gray-500 mt-1">Manage material returns and approve stock quantity adjustments.</p>
        </div>
        <Button className="bg-[#0047ff] hover:bg-blue-700">
          {activeTab === 'returns' ? 'Log Return' : 'New Adjustment'}
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('returns')}
              className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${activeTab === 'returns' ? 'border-[#0047ff] text-[#0047ff]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              Material Returns
            </button>
            <button
              onClick={() => setActiveTab('adjustments')}
              className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${activeTab === 'adjustments' ? 'border-[#0047ff] text-[#0047ff]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              Stock Adjustments
            </button>
          </nav>
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
                  {activeTab === 'returns' ? (
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Return No</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Condition</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  ) : (
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Batch</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Old Qty</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">New Qty</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  )}
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      {activeTab === 'returns' ? (
                        <>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.return_number}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.department}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.item?.name} <span className="font-medium">x{item.quantity}</span></td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                              ${item.condition === 'Usable' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {item.condition}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                             <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-gray-100 text-gray-800">
                              {item.status}
                             </span>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {item.batch?.batch_number}
                            <div className="text-xs text-gray-500 font-normal">{item.batch?.item?.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.reason}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 line-through">{item.old_quantity}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">{item.new_quantity}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                              ${item.status === 'Pending Approval' ? 'bg-yellow-100 text-yellow-800' : 
                                item.status === 'Approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {item.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            {item.status === 'Pending Approval' && (
                              <div className="flex justify-end space-x-2">
                                <Button onClick={() => handleAdjustmentApproval(item.id, true)} size="sm" className="bg-green-600 hover:bg-green-700">
                                  <CheckCircle className="w-4 h-4 mr-1" /> Approve
                                </Button>
                                <Button onClick={() => handleAdjustmentApproval(item.id, false)} size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                                  <XCircle className="w-4 h-4 mr-1" /> Reject
                                </Button>
                              </div>
                            )}
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                  {data.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                        {activeTab === 'returns' ? <CornerDownLeft className="mx-auto h-12 w-12 text-gray-400" /> : <RefreshCcw className="mx-auto h-12 w-12 text-gray-400" />}
                        <p className="mt-2 text-sm font-medium text-gray-900">No {activeTab} records found.</p>
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
