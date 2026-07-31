import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, FileOutput, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function MaterialRequests() {
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
        const { data: reqs } = await supabase
          .from('material_requests')
          .select('*, project:projects(name, project_code)')
          .eq('status', 'Pending')
          .order('created_at', { ascending: false });
        setData(reqs || []);
      } else {
        const { data: reqs } = await supabase
          .from('material_requests')
          .select('*, project:projects(name, project_code)')
          .neq('status', 'Pending')
          .order('created_at', { ascending: false });
        setData(reqs || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApproval = async (reqId: string, status: 'Approved' | 'Rejected') => {
    await supabase.from('material_requests').update({ status }).eq('id', reqId);
    fetchData();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Material Requests</h1>
          <p className="text-sm text-gray-500 mt-1">Review and approve department material requests.</p>
        </div>
        <Button className="bg-[#0047ff] hover:bg-blue-700">Create Request</Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('pending')}
              className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${activeTab === 'pending' ? 'border-[#0047ff] text-[#0047ff]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              Pending Requests
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${activeTab === 'history' ? 'border-[#0047ff] text-[#0047ff]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              Request History
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Request No</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.request_number}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.department}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.project?.name || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                          ${item.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                          {item.priority || 'Normal'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                          ${item.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : 
                            item.status === 'Approved' ? 'bg-blue-100 text-blue-800' :
                            item.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {activeTab === 'pending' ? (
                          <div className="flex justify-end space-x-2">
                            <Button onClick={() => handleApproval(item.id, 'Approved')} size="sm" className="bg-blue-600 hover:bg-blue-700">
                              <CheckCircle className="w-4 h-4 mr-1" /> Approve
                            </Button>
                            <Button onClick={() => handleApproval(item.id, 'Rejected')} size="sm" variant="outline" className="text-red-600 border-red-200">
                              <XCircle className="w-4 h-4 mr-1" /> Reject
                            </Button>
                          </div>
                        ) : (
                           <button className="text-[#0047ff] hover:text-blue-900">View Details</button>
                        )}
                      </td>
                    </tr>
                  ))}
                  {data.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                        <FileOutput className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm font-medium text-gray-900">No {activeTab} requests found.</p>
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
