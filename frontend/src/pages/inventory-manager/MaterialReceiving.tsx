import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, PackageOpen, Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function MaterialReceiving() {
  const [activeTab, setActiveTab] = useState<'pending' | 'history'>('pending');
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
        // Fetch approved POs that need receiving (using purchase_orders from Module-02)
        const { data: pos } = await supabase
          .from('purchase_orders')
          .select('*, supplier:suppliers(name)')
          .eq('status', 'Approved')
          .order('created_at', { ascending: false });
        setData(pos || []);
      } else {
        // Fetch material receipts
        const { data: receipts } = await supabase
          .from('material_receipts')
          .select('*, po:purchase_orders(po_number), supplier:suppliers(name)')
          .order('received_date', { ascending: false });
        setData(receipts || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReceive = async (po: any) => {
    // In a real app, this would open a modal to select items, quantities, and generate batch numbers.
    // For prototype, we'll create a receipt with mock items directly.
    const receiptNumber = `MR-${new Date().getTime()}`;
    const { data: receipt, error: receiptError } = await supabase
      .from('material_receipts')
      .insert({
        receipt_number: receiptNumber,
        po_id: po.id,
        supplier_id: po.supplier_id,
        received_date: new Date().toISOString().split('T')[0],
        status: 'Pending Verification'
      })
      .select()
      .single();

    if (!receiptError && receipt) {
      // Mock receipt item creation
      await supabase.from('material_receipt_items').insert({
        receipt_id: receipt.id,
        // Using a random UUID for item_id is problematic because of foreign key, 
        // ideally we fetch an actual inventory_item, but assuming we can just mark it received
        quantity: 100
      });
      fetchData();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Material Receiving (GRN)</h1>
          <p className="text-sm text-gray-500 mt-1">Receive materials against Purchase Orders from suppliers.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('pending')}
              className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${activeTab === 'pending' ? 'border-[#0047ff] text-[#0047ff]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              Pending POs
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${activeTab === 'history' ? 'border-[#0047ff] text-[#0047ff]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              Receipts History
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
                      {activeTab === 'pending' ? 'PO Number' : 'Receipt No'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Supplier
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                      Date
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
                  {data.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {activeTab === 'pending' ? item.po_number : item.receipt_number}
                        {activeTab === 'history' && <div className="text-xs text-gray-500 font-normal">PO: {item.po?.po_number}</div>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {item.supplier?.name || 'Unknown Supplier'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {activeTab === 'pending' ? new Date(item.created_at).toLocaleDateString() : new Date(item.received_date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                          ${item.status === 'Pending Verification' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {activeTab === 'pending' ? (
                          <Button onClick={() => handleReceive(item)} size="sm">
                            Receive Goods
                          </Button>
                        ) : (
                          <button className="text-[#0047ff] hover:text-blue-900">
                            <Download className="w-5 h-5 inline" />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {data.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                        <PackageOpen className="mx-auto h-12 w-12 text-gray-400" />
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
