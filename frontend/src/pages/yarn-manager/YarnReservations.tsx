import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, Box, Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function YarnReservations() {
  const [activeTab, setActiveTab] = useState<'reservations' | 'issues'>('reservations');
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const fetchData = async () => {
    setIsLoading(true);
    if (activeTab === 'reservations') {
      const { data: resData } = await supabase
        .from('yarn_reservations')
        .select('*, projects(order_number, product_name), yarn_lots(lot_number, yarn_master(yarn_type))')
        .order('created_at', { ascending: false });
      if (resData) setData(resData);
    } else {
      const { data: issuesData } = await supabase
        .from('yarn_issues')
        .select('*, projects(order_number), yarn_lots(lot_number, yarn_master(yarn_type)), knitting_production_orders(kpo_number)')
        .order('created_at', { ascending: false });
      if (issuesData) setData(issuesData);
    }
    setIsLoading(false);
  };

  const handleIssueYarn = async (resId: string, projectId: string, lotId: string, quantity: number) => {
    // 1. Create a dummy KPO (or use existing, but for demo we just issue it)
    const { data: kpo } = await supabase.from('knitting_production_orders').insert([{
      project_id: projectId,
      kpo_number: `KPO-${Math.floor(Math.random() * 10000)}`,
      status: 'Issued'
    }]).select().single();

    if (kpo) {
      // 2. Insert into yarn_issues
      await supabase.from('yarn_issues').insert([{
        kpo_id: kpo.id,
        project_id: projectId,
        lot_id: lotId,
        quantity: quantity,
      }]);

      // 3. Update reservation status
      await supabase.from('yarn_reservations').update({ status: 'Issued' }).eq('id', resId);
      fetchData();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Yarn Allocation</h1>
        <p className="text-sm text-gray-500 mt-1">Manage project reservations and KPO material issues</p>
      </div>

      <div className="flex space-x-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('reservations')}
          className={`pb-4 px-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'reservations' ? 'border-[#0047ff] text-[#0047ff]' : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Box className="w-4 h-4 inline mr-2" />
          Reservations
        </button>
        <button
          onClick={() => setActiveTab('issues')}
          className={`pb-4 px-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'issues' ? 'border-[#0047ff] text-[#0047ff]' : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Send className="w-4 h-4 inline mr-2" />
          Issues
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              {activeTab === 'reservations' ? (
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Project</th>
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Yarn Lot</th>
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Qty (kg)</th>
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              ) : (
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">KPO Number</th>
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Project</th>
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Yarn Lot</th>
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Issued Qty</th>
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Date Issued</th>
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
              ) : data.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500 text-sm">
                    No records found.
                  </td>
                </tr>
              ) : activeTab === 'reservations' ? (
                data.map((res) => (
                  <tr key={res.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-medium text-gray-900">{res.projects?.order_number}</p>
                      <p className="text-xs text-gray-500">{res.projects?.product_name}</p>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-medium text-[#0047ff]">{res.yarn_lots?.lot_number}</p>
                      <p className="text-xs text-gray-500">{res.yarn_lots?.yarn_master?.yarn_type}</p>
                    </td>
                    <td className="py-4 px-6 text-right font-medium">{res.quantity}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                        res.status === 'Issued' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {res.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      {res.status === 'Reserved' && (
                        <Button 
                          onClick={() => handleIssueYarn(res.id, res.project_id, res.lot_id, res.quantity)} 
                          size="sm" 
                          className="bg-[#0047ff] hover:bg-blue-700 text-white"
                        >
                          Issue Yarn
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                data.map((issue) => (
                  <tr key={issue.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-medium text-gray-900">{issue.knitting_production_orders?.kpo_number}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{issue.projects?.order_number}</td>
                    <td className="py-4 px-6">
                      <p className="font-medium text-[#0047ff]">{issue.yarn_lots?.lot_number}</p>
                      <p className="text-xs text-gray-500">{issue.yarn_lots?.yarn_master?.yarn_type}</p>
                    </td>
                    <td className="py-4 px-6 text-right font-medium text-gray-900">{issue.quantity} kg</td>
                    <td className="py-4 px-6 text-right text-sm text-gray-600">{new Date(issue.created_at).toLocaleDateString()}</td>
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
