import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Search, Loader2 } from 'lucide-react';

export function YarnInventory() {
  const [inventory, setInventory] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('yarn_inventory')
      .select('*, yarn_lots(lot_number, yarn_master(yarn_type, composition, brand)), warehouse_locations(warehouse, rack, shelf, bin)')
      .order('updated_at', { ascending: false });
      
    if (!error && data) {
      setInventory(data);
    }
    setIsLoading(false);
  };

  const filteredInventory = inventory.filter(inv => 
    inv.yarn_lots?.lot_number?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.yarn_lots?.yarn_master?.yarn_type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Yarn Inventory</h1>
        <p className="text-sm text-gray-500 mt-1">Real-time tracking of available, reserved, and issued yarn stock.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center">
          <div className="relative w-full max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by lot or yarn type..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Lot Details</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Location</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Available</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Reserved</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Issued</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Rejected</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center">
                    <Loader2 className="w-6 h-6 animate-spin text-gray-400 mx-auto" />
                  </td>
                </tr>
              ) : filteredInventory.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500 text-sm">
                    No inventory records found.
                  </td>
                </tr>
              ) : (
                filteredInventory.map((inv) => (
                  <tr key={inv.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-medium text-[#0047ff]">Lot: {inv.yarn_lots?.lot_number}</p>
                      <p className="text-sm text-gray-900">{inv.yarn_lots?.yarn_master?.yarn_type}</p>
                      <p className="text-xs text-gray-500">{inv.yarn_lots?.yarn_master?.composition}</p>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      {inv.warehouse_locations ? (
                        <>
                          <span className="font-medium">{inv.warehouse_locations.warehouse}</span>
                          <br />
                          <span className="text-xs text-gray-400">
                            {inv.warehouse_locations.rack && `R:${inv.warehouse_locations.rack} `}
                            {inv.warehouse_locations.shelf && `S:${inv.warehouse_locations.shelf} `}
                            {inv.warehouse_locations.bin && `B:${inv.warehouse_locations.bin}`}
                          </span>
                        </>
                      ) : (
                        'Unassigned'
                      )}
                    </td>
                    <td className="py-4 px-6 text-right font-medium text-gray-900">{inv.available} kg</td>
                    <td className="py-4 px-6 text-right text-yellow-600 font-medium">{inv.reserved} kg</td>
                    <td className="py-4 px-6 text-right text-blue-600 font-medium">{inv.issued} kg</td>
                    <td className="py-4 px-6 text-right text-red-600 font-medium">{inv.rejected} kg</td>
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
