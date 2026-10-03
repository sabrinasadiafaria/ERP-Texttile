import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { 
  FolderKanban, 
  Activity, 
  AlertTriangle,
  Loader2,
  Box
} from 'lucide-react';

export function DirectorDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    delayedProjects: 0,
    pendingYarnRequests: 0,
    totalFinishedGoods: 0
  });

  const [activeProjectsList, setActiveProjectsList] = useState<any[]>([]);

  useEffect(() => {
    fetchDirectorData();
  }, []);

  const fetchDirectorData = async () => {
    setLoading(true);
    try {
      const { data: projects } = await supabase.from('projects').select('*');
      const { data: yarnReqs } = await supabase.from('yarn_requests').select('id').eq('status', 'PENDING');
      const { data: finGoods } = await supabase.from('finished_goods').select('total_quantity');
      
      const pData = projects || [];
      const totalFinished = (finGoods || []).reduce((acc, curr) => acc + (curr.total_quantity || 0), 0);

      setStats({
        totalProjects: pData.length,
        activeProjects: pData.filter(p => p.status !== 'COMPLETED').length,
        completedProjects: pData.filter(p => p.status === 'COMPLETED').length,
        delayedProjects: pData.filter(p => p.status === 'DELAYED').length,
        pendingYarnRequests: yarnReqs?.length || 0,
        totalFinishedGoods: totalFinished
      });

      // Get production records for active projects to show progress
      const activeP = pData.filter(p => p.status !== 'COMPLETED');
      if (activeP.length > 0) {
        const { data: prod } = await supabase
          .from('production_records')
          .select('*')
          .in('project_id', activeP.map(p => p.id));
        
        const mapped = activeP.map(p => {
          const pRecords = (prod || []).filter(r => r.project_id === p.id);
          // Find the furthest department that has records
          const currentDepts = Array.from(new Set(pRecords.map(r => r.department)));
          return {
            ...p,
            departments: currentDepts.join(', ') || 'Planning'
          };
        });
        setActiveProjectsList(mapped);
      }
      
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  if (loading) {
    return <div className="flex h-64 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Director Dashboard</h1>
        <p className="text-gray-500">Executive overview of factory operations</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <FolderKanban className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Projects</p>
              <h3 className="text-2xl font-bold text-gray-900">{stats.totalProjects}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Active Projects</p>
              <h3 className="text-2xl font-bold text-gray-900">{stats.activeProjects}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
              <Box className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Finished Goods Total</p>
              <h3 className="text-2xl font-bold text-gray-900">{stats.totalFinishedGoods}</h3>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-lg">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Yarn Requests</p>
              <h3 className="text-2xl font-bold text-gray-900">{stats.pendingYarnRequests}</h3>
            </div>
          </div>
        </div>

      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden mt-8">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900">Active Projects Production Status</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target Qty</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Active Departments</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {activeProjectsList.map((p) => (
                <tr key={p.id}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{p.order_number}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{p.product_name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{p.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {p.departments}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {p.delivery_date ? new Date(p.delivery_date).toLocaleDateString() : 'N/A'}
                  </td>
                </tr>
              ))}
              {activeProjectsList.length === 0 && (
                <tr><td colSpan={5} className="px-6 py-4 text-center text-gray-500">No active projects</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
