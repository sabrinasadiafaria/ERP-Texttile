import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Users, FolderKanban, ShoppingCart, TrendingUp, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export function MerchandiserDashboard() {
  const [stats, setStats] = useState({
    buyers: 0,
    projects: 0,
    pos: 0,
    activeProjects: 0
  });

  useEffect(() => {
    async function fetchStats() {
      const { count: buyersCount } = await supabase.from('buyers').select('*', { count: 'exact', head: true });
      const { count: projectsCount } = await supabase.from('projects').select('*', { count: 'exact', head: true });
      const { count: activeProjectsCount } = await supabase.from('projects').select('*', { count: 'exact', head: true }).neq('status', 'Completed');
      const { count: posCount } = await supabase.from('purchase_orders').select('*', { count: 'exact', head: true });

      setStats({
        buyers: buyersCount || 0,
        projects: projectsCount || 0,
        activeProjects: activeProjectsCount || 0,
        pos: posCount || 0,
      });
    }
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Merchandiser Overview</h1>
        <p className="text-sm text-gray-500 mt-1">Monitor buyers, production projects, and supplier orders.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-[#0047ff] mr-4">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Buyers</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.buyers}</h3>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 mr-4">
            <FolderKanban className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Active Projects</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.activeProjects}</h3>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center">
          <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mr-4">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Purchase Orders</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.pos}</h3>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center">
          <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 mr-4">
            <TrendingUp className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Performance</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">98%</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Recent Projects</h2>
            <Link to="/dashboard/projects" className="text-sm font-medium text-[#0047ff] hover:underline">View All</Link>
          </div>
          <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg border border-dashed border-gray-200">
             <span className="text-gray-400 text-sm">Chart Placeholder</span>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Recent Notifications</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <Clock className="w-5 h-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-gray-900">PO-1004 Approved</p>
                <p className="text-xs text-gray-500 mt-0.5">Supplier confirmed receipt of order.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
