import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, CheckSquare, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function MaterialVerification() {
  const [activeTab, setActiveTab] = useState<'pending' | 'verified'>('pending');
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (activeTab === 'pending') {
        // Fetch receipts that are pending verification
        const { data: receipts } = await supabase
          .from('material_receipts')
          .select('*, supplier:suppliers(name)')
          .eq('status', 'Pending Verification')
          .order('received_date', { ascending: false });
        setData(receipts || []);
      } else {
        // Fetch verifications
        const { data: verifications } = await supabase
          .from('material_verifications')
          .select('*, receipt_item:material_receipt_items(receipt:material_receipts(receipt_number, supplier:suppliers(name)))')
          .order('verified_at', { ascending: false });
        setData(verifications || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (receipt: any, isPass: boolean) => {
    // 1. Mark receipt as verified
    await supabase
      .from('material_receipts')
      .update({ status: isPass ? 'Verified' : 'Rejected' })
      .eq('id', receipt.id);
      
    // 2. Create verification record (Mocking receipt_item_id as we skipped fetching actual items for prototype)
    // Normally we iterate over receipt items. Here we just fetch the first item.
    const { data: items } = await supabase.from('material_receipt_items').select('*').eq('receipt_id', receipt.id).limit(1);
    
    if (items && items.length > 0) {
      await supabase.from('material_verifications').insert({
        receipt_item_id: items[0].id,
        verified_quantity: isPass ? items[0].quantity : 0,
        rejected_quantity: isPass ? 0 : items[0].quantity,
        status: isPass ? 'Accepted' : 'Rejected',
        verified_at: new Date().toISOString()
      });

      // 3. If passed, add to inventory_batches
      if (isPass) {
        await supabase.from('inventory_batches').insert({
          item_id: items[0].item_id, // This might be null in our mock, but in real app it exists
          batch_number: `BATCH-${receipt.receipt_number}`,
          quantity: items[0].quantity,
          supplier_id: receipt.supplier_id,
          status: 'Available'
        });
      }
    }

    fetchData();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Material Verification (QA)</h1>
          <p className="text-sm text-gray-500 mt-1">Inspect received materials and update quality status.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('pending')}
              className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${activeTab === 'pending' ? 'border-[#0047ff] text-[#0047ff]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              Pending QA
            </button>
            <button
              onClick={() => setActiveTab('verified')}
              className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${activeTab === 'verified' ? 'border-[#0047ff] text-[#0047ff]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              Verification History
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
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Receipt No
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Supplier
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.map((item) => {
                    const isPending = activeTab === 'pending';
                    const receiptNo = isPending ? item.receipt_number : item.receipt_item?.receipt?.receipt_number;
                    const supplier = isPending ? item.supplier?.name : item.receipt_item?.receipt?.supplier?.name;
                    
                    return (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {receiptNo || 'Unknown Receipt'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {supplier || 'Unknown Supplier'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                            ${item.status === 'Pending Verification' || item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                              item.status === 'Accepted' || item.status === 'Verified' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {isPending ? (
                            <div className="flex justify-end space-x-2">
                              <Button onClick={() => handleVerify(item, true)} size="sm" className="bg-green-600 hover:bg-green-700">
                                <CheckCircle className="w-4 h-4 mr-1" /> Pass
                              </Button>
                              <Button onClick={() => handleVerify(item, false)} size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
                                <XCircle className="w-4 h-4 mr-1" /> Fail
                              </Button>
                            </div>
                          ) : (
                            <span className="text-gray-400">Verified on {new Date(item.verified_at).toLocaleDateString()}</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                  {data.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                        <CheckSquare className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm font-medium text-gray-900">No {activeTab} QA records found.</p>
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
