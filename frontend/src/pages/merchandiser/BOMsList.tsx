import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { FileText, Loader2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function BOMsList() {
  const [boms, setBoms] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchBOMs();
  }, []);

  const fetchBOMs = async () => {
    setIsLoading(true);
    try {
      const { data } = await supabase
        .from('project_boms')
        .select(`
          *,
          project:projects(name, project_code)
        `)
        .order('created_at', { ascending: false });
      
      setBoms(data || []);
    } catch (error) {
      console.error('Error fetching BOMs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Bill of Materials (BOMs)</h1>
        <p className="text-sm text-gray-500 mt-1">Overview of all project BOMs and their statuses.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">All BOMs</h2>
        </div>
        <div className="p-6">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-[#0047ff]" />
            </div>
          ) : boms.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {boms.map((bom) => (
                    <tr key={bom.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{bom.project?.name}</div>
                        <div className="text-sm text-gray-500">{bom.project?.project_code}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                          ${bom.status === 'Draft' ? 'bg-gray-100 text-gray-800' : 
                            bom.status === 'Approved' ? 'bg-green-100 text-green-800' : 
                            'bg-blue-100 text-blue-800'}`}>
                          {bom.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(bom.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Link 
                          to={`/dashboard/projects/${bom.project_id}/bom`}
                          className="text-[#0047ff] hover:text-blue-900 flex items-center justify-end"
                        >
                          View Details <ArrowRight className="w-4 h-4 ml-1" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-semibold text-gray-900">No BOMs</h3>
              <p className="mt-1 text-sm text-gray-500">
                You haven't created any BOMs yet. Go to a project to create its BOM.
              </p>
              <div className="mt-6">
                <Link 
                  to="/dashboard/projects"
                  className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#0047ff] hover:bg-blue-700"
                >
                  View Projects
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
