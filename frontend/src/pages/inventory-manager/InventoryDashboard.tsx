import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { PackageOpen, CheckSquare, Warehouse, FileOutput, ArrowRight, AlertTriangle, PackageCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export function InventoryDashboard() {
  const [stats, setStats] = useState({
    pendingReceipts: 0,
    pendingVerifications: 0,
    pendingRequests: 0,
    activeBatches: 0
  });

  useEffect(() => {
    async function fetchStats() {
      const { count: receiptsCount } = await supabase.from('material_receipts').select('*', { count: 'exact', head: true }).eq('status', 'Pending Verification');
      const { count: verificationsCount } = await supabase.from('material_verifications').select('*', { count: 'exact', head: true }).eq('status', 'Pending');
      const { count: requestsCount } = await supabase.from('material_requests').select('*', { count: 'exact', head: true }).eq('status', 'Pending');
      const { count: batchesCount } = await supabase.from('inventory_batches').select('*', { count: 'exact', head: true }).gt('quantity', 0);

      setStats({
        pendingReceipts: receiptsCount || 0,
        pendingVerifications: verificationsCount || 0,
        pendingRequests: requestsCount || 0,
        activeBatches: batchesCount || 0,
      });
    }
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Inventory & Store Overview</h1>
        <p className="text-sm text-gray-500 mt-1">Monitor general inventory, material requests, and warehouse operations.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-[#0047ff] mr-4">
            <PackageOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Pending Receipts</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.pendingReceipts}</h3>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center">
          <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center text-yellow-600 mr-4">
            <CheckSquare className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Pending QA</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.pendingVerifications}</h3>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center">
          <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mr-4">
            <FileOutput className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Pending Requests</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.pendingRequests}</h3>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center">
          <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 mr-4">
            <Warehouse className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Active Batches</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.activeBatches}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Inventory Alerts</h2>
            <Link to="/dashboard/inventory-manager/warehouse" className="text-sm font-medium text-[#0047ff] hover:underline flex items-center">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="space-y-4">
            <div className="flex items-start justify-between p-3 bg-red-50 rounded-lg border border-red-100">
               <div className="flex items-center">
                  <AlertTriangle className="w-5 h-5 text-red-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Low Stock: Packaging Tape</p>
                    <p className="text-xs text-red-600 mt-0.5">Current: 50 rolls (Min: 100)</p>
                  </div>
               </div>
            </div>
            <div className="flex items-start justify-between p-3 bg-yellow-50 rounded-lg border border-yellow-100">
               <div className="flex items-center">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Pending Verification: Chemical A</p>
                    <p className="text-xs text-yellow-700 mt-0.5">Received 2 days ago.</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900">Recent Finished Goods</h2>
            <Link to="/dashboard/inventory-manager/finished-goods" className="text-sm font-medium text-[#0047ff] hover:underline flex items-center">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="flex flex-col space-y-4">
             <div className="flex items-start justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
               <div className="flex items-center">
                 <PackageCheck className="w-5 h-5 text-gray-400 mr-3" />
                 <div>
                    <p className="text-sm font-medium text-gray-900">Carton #10042 (PRJ-T-SHIRT-01)</p>
                    <p className="text-xs text-gray-500 mt-0.5">Received today</p>
                 </div>
               </div>
               <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-blue-100 text-blue-800">
                 Stored
               </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
