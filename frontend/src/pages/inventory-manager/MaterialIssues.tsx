import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Loader2, ArrowLeftRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function MaterialIssues() {
  const [activeTab, setActiveTab] = useState<'pending' | 'issued'>('pending');
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
        // Fetch Approved requests that need to be issued
        const { data: reqs } = await supabase
          .from('material_requests')
          .select('*, project:projects(name)')
          .eq('status', 'Approved')
          .order('created_at', { ascending: false });
        setData(reqs || []);
      } else {
        // Fetch Issue Notes (MIN)
        const { data: issues } = await supabase
          .from('material_issue_notes')
          .select('*, request:material_requests(request_number), project:projects(name)')
          .order('issue_date', { ascending: false });
        setData(issues || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleIssue = async (req: any) => {
    // Generate MIN
    const minNumber = `MIN-${new Date().getTime()}`;
    const { data: min, error } = await supabase
      .from('material_issue_notes')
      .insert({
        min_number: minNumber,
        request_id: req.id,
        department: req.department,
        project_id: req.project_id,
        issue_date: new Date().toISOString().split('T')[0],
        status: 'Issued'
      })
      .select()
      .single();

    if (!error && min) {
      // Mark request as Completed
      await supabase.from('material_requests').update({ status: 'Completed' }).eq('id', req.id);
      
      // Real app: Deduct inventory batches and record inventory_movements here
      fetchData();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Material Issue Notes (MIN)</h1>
          <p className="text-sm text-gray-500 mt-1">Fulfill approved requests and issue materials to departments.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            <button
              onClick={() => setActiveTab('pending')}
              className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${activeTab === 'pending' ? 'border-[#0047ff] text-[#0047ff]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              Approved Requests
            </button>
            <button
              onClick={() => setActiveTab('issued')}
              className={`w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm ${activeTab === 'issued' ? 'border-[#0047ff] text-[#0047ff]' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
            >
              Issue History
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
                      {activeTab === 'pending' ? 'Request No' : 'MIN No'}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {activeTab === 'pending' ? item.request_number : item.min_number}
                        {activeTab === 'issued' && <div className="text-xs text-gray-500 font-normal">Req: {item.request?.request_number}</div>}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.department}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.project?.name || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                         {activeTab === 'pending' ? new Date(item.created_at).toLocaleDateString() : new Date(item.issue_date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                          ${activeTab === 'pending' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {activeTab === 'pending' ? (
                          <Button onClick={() => handleIssue(item)} size="sm">
                            Generate MIN
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
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                        <ArrowLeftRight className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="mt-2 text-sm font-medium text-gray-900">No {activeTab} items found.</p>
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
