import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, CheckCircle2, XCircle, ClipboardCheck, Box } from 'lucide-react';

export function GoodsReceipts() {
  const [receipts, setReceipts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'receipts' | 'inspections'>('receipts');

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const fetchData = async () => {
    setIsLoading(true);
    if (activeTab === 'receipts') {
      const { data } = await supabase
        .from('goods_receipts')
        .select('*, purchase_orders(po_number), suppliers(company_name), yarn_lots(lot_number)')
        .order('created_at', { ascending: false });
      if (data) setReceipts(data);
    } else {
      const { data } = await supabase
        .from('quality_inspections')
        .select('*, goods_receipts(*, purchase_orders(po_number), yarn_lots(lot_number))')
        .order('created_at', { ascending: false });
      if (data) setReceipts(data);
    }
    setIsLoading(false);
  };

  const handlePassQA = async (inspectionId: string, receiptId: string) => {
    // 1. Update QA status
    await supabase.from('quality_inspections').update({ status: 'Passed' }).eq('id', inspectionId);
    
    // 2. Add to inventory (simplification for mock)
    // In production, we'd look up location and insert/update yarn_inventory
    const { data: receipt } = await supabase.from('goods_receipts').select('*').eq('id', receiptId).single();
    
    if (receipt) {
      await supabase.from('yarn_inventory').insert([{
        lot_id: receipt.lot_id,
        location_id: receipt.location_id,
        available: receipt.net_weight
      }]);
    }
    
    fetchData();
  };

  const handleFailQA = async (inspectionId: string) => {
    await supabase.from('quality_inspections').update({ status: 'Rejected' }).eq('id', inspectionId);
    fetchData();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Receiving & Quality</h1>
          <p className="text-sm text-gray-500 mt-1">Manage goods receipts and quality inspections</p>
        </div>
      </div>

      <div className="flex space-x-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('receipts')}
          className={`pb-4 px-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'receipts' ? 'border-[#0047ff] text-[#0047ff]' : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Box className="w-4 h-4 inline mr-2" />
          Goods Receipts
        </button>
        <button
          onClick={() => setActiveTab('inspections')}
          className={`pb-4 px-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'inspections' ? 'border-[#0047ff] text-[#0047ff]' : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <ClipboardCheck className="w-4 h-4 inline mr-2" />
          Quality Inspections
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              {activeTab === 'receipts' ? (
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">PO Number</th>
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Supplier</th>
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Lot Number</th>
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Weight (kg)</th>
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Date Received</th>
                </tr>
              ) : (
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">PO / Lot Number</th>
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Inspector</th>
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">QA Actions</th>
                </tr>
              )}
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center">
                    <Loader2 className="w-6 h-6 animate-spin text-gray-400 mx-auto" />
                  </td>
                </tr>
              ) : receipts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500 text-sm">
                    No {activeTab} found.
                  </td>
                </tr>
              ) : activeTab === 'receipts' ? (
                receipts.map((receipt) => (
                  <tr key={receipt.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 text-sm font-medium text-gray-900">{receipt.purchase_orders?.po_number}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{receipt.suppliers?.company_name}</td>
                    <td className="py-4 px-6 text-sm font-medium text-[#0047ff]">{receipt.yarn_lots?.lot_number}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{receipt.net_weight}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{new Date(receipt.received_date).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                receipts.map((inspection) => (
                  <tr key={inspection.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <p className="text-sm font-medium text-gray-900">{inspection.goods_receipts?.purchase_orders?.po_number}</p>
                      <p className="text-xs text-gray-500">Lot: {inspection.goods_receipts?.yarn_lots?.lot_number}</p>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">{inspection.inspector || 'Pending Assignment'}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                        inspection.status === 'Passed' ? 'bg-green-100 text-green-800' :
                        inspection.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {inspection.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-2">
                      {inspection.status === 'Pending' && (
                        <>
                          <button onClick={() => handlePassQA(inspection.id, inspection.receipt_id)} className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Pass QA">
                            <CheckCircle2 className="w-5 h-5" />
                          </button>
                          <button onClick={() => handleFailQA(inspection.id)} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Fail QA">
                            <XCircle className="w-5 h-5" />
                          </button>
                        </>
                      )}
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
