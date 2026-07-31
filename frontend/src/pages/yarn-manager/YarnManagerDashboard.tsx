import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Factory, Box, ShoppingCart, ClipboardCheck, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export function YarnManagerDashboard() {
  const [stats, setStats] = useState({
    pendingPOs: 0,
    pendingQA: 0,
    inventoryCount: 0,
    activeKPOs: 0
  });

  useEffect(() => {
    async function fetchStats() {
      const { count: poCount } = await supabase.from('purchase_orders').select('*', { count: 'exact', head: true }).eq('status', 'Draft');
      const { count: qaCount } = await supabase.from('quality_inspections').select('*', { count: 'exact', head: true }).eq('status', 'Pending');
      const { count: invCount } = await supabase.from('yarn_inventory').select('*', { count: 'exact', head: true }).gt('available', 0);
      const { count: kpoCount } = await supabase.from('knitting_production_orders').select('*', { count: 'exact', head: true }).in('status', ['Draft', 'Issued']);

      setStats({
        pendingPOs: poCount || 0,
        pendingQA: qaCount || 0,
        inventoryCount: invCount || 0,
        activeKPOs: kpoCount || 0,
      });
    }
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Yarn Management Overview</h1>
        <p className="text-sm text-gray-500 mt-1">Monitor supplier deliveries, quality inspections, and material allocations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-[#0047ff] mr-4">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Pending POs</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.pendingPOs}</h3>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center">
          <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600 mr-4">
            <ClipboardCheck className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Pending QA</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.pendingQA}</h3>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 mr-4">
            <Box className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Available Lots</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.inventoryCount}</h3>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center">
          <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mr-4">
            <Factory className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Active KPOs</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.activeKPOs}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Inventory Levels by Type</h2>
            <Link to="/dashboard/yarn-manager/inventory" className="text-sm font-medium text-[#0047ff] hover:underline flex items-center">
              View Inventory <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="flex items-center justify-center h-48 bg-gray-50 rounded-lg border border-dashed border-gray-200">
             <span className="text-gray-400 text-sm">Chart Placeholder</span>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Recent Quality Inspections</h2>
            <Link to="/dashboard/yarn-manager/receipts" className="text-sm font-medium text-[#0047ff] hover:underline flex items-center">
              View QA <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="space-y-4">
            <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
               <div>
                  <p className="text-sm font-medium text-gray-900">PO-1005 (Lot YRN-C20-001)</p>
                  <p className="text-xs text-gray-500 mt-0.5">Cotton 20/2 - Acme Yarns Ltd.</p>
               </div>
               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-yellow-100 text-yellow-800">
                 Pending
               </span>
            </div>
            <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
               <div>
                  <p className="text-sm font-medium text-gray-900">PO-1002 (Lot YRN-P30-004)</p>
                  <p className="text-xs text-gray-500 mt-0.5">Polyester 30s - TexCo</p>
               </div>
               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-green-100 text-green-800">
                 Passed
               </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
