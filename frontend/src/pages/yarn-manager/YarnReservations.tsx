import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, Box, Send } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function YarnReservations() {
  const [activeTab, setActiveTab] = useState<'requests' | 'reservations' | 'issues'>('requests');
  const [data, setData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const fetchData = async () => {
    setIsLoading(true);
    if (activeTab === 'requests') {
      const { data: reqData } = await supabase
        .from('yarn_requests')
        .select('*, projects(order_number, product_name), profiles!yarn_requests_requested_by_fkey(full_name)')
        .order('created_at', { ascending: false });
      if (reqData) setData(reqData);
    } else if (activeTab === 'reservations') {
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

  const handleApproveRequest = async (reqId: string, projectId: string, qty: number) => {
    // 1. Approve Request
    await supabase.from('yarn_requests').update({ status: 'APPROVED', approved_quantity: qty }).eq('id', reqId);
    
    // 2. Mock reservation for now
    await supabase.from('yarn_reservations').insert([{
      project_id: projectId,
      quantity: qty,
      status: 'Reserved'
    }]);

    fetchData();
  };

  const handleIssueYarn = async (resId: string, projectId: string, lotId: string, quantity: number) => {
    const { data: userData } = await supabase.auth.getUser();

    // 1. Create a generic production record for Knitting
    const { data: pRec } = await supabase.from('production_records').insert([{
      project_id: projectId,
      department: 'knitting',
      input_quantity: quantity,
      planned_quantity: quantity,
      status: 'RECEIVED',
      created_by: userData?.user?.id
    }]).select().single();

    if (pRec) {
      // 2. Insert into yarn_issues
      await supabase.from('yarn_issues').insert([{
        kpo_id: null, // deprecated in favor of production_records
        project_id: projectId,
        lot_id: lotId,
        quantity: quantity,
      }]);

      // 3. Update reservation status
      await supabase.from('yarn_reservations').update({ status: 'Issued' }).eq('id', resId);
      
      // 4. Log Activity
      await supabase.from('activity_logs').insert({
        user_id: userData?.user?.id,
        action: 'ISSUE_YARN',
        module: 'yarn',
        description: `Issued ${quantity}kg yarn to Knitting for project ${projectId}`
      });
      
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
          onClick={() => setActiveTab('requests')}
          className={`pb-4 px-2 text-sm font-medium border-b-2 transition-colors ${
            activeTab === 'requests' ? 'border-[#0047ff] text-[#0047ff]' : 'border-transparent text-gray-500 hover:text-gray-700'
          }`}
        >
          <Box className="w-4 h-4 inline mr-2" />
          Requests
        </button>
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
              {activeTab === 'requests' ? (
                <tr className="bg-gray-50/50 border-b border-gray-100">
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Project</th>
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Requested By</th>
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Req Qty</th>
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              ) : activeTab === 'reservations' ? (
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
              ) : activeTab === 'requests' ? (
                data.map((req) => (
                  <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-medium text-gray-900">{req.projects?.order_number}</p>
                      <p className="text-xs text-gray-500">{req.projects?.product_name}</p>
                    </td>
                    <td className="py-4 px-6 text-gray-900">{req.profiles?.full_name}</td>
                    <td className="py-4 px-6 text-right font-medium">{req.requested_quantity}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${
                        req.status === 'APPROVED' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      {req.status === 'PENDING' && (
                        <Button 
                          onClick={() => handleApproveRequest(req.id, req.project_id, req.requested_quantity)} 
                          size="sm" 
                          className="bg-[#0047ff] hover:bg-blue-700 text-white"
                        >
                          Approve
                        </Button>
                      )}
                    </td>
                  </tr>
                ))
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
