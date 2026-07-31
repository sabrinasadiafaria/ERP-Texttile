import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Search, Loader2, MapPin, Grid, Layers, Box } from 'lucide-react';

export function WarehouseManagement() {
  const [activeTab, setActiveTab] = useState<'zones' | 'racks' | 'shelves' | 'bins'>('zones');
  const [isLoading, setIsLoading] = useState(true);
  
  // Data states
  const [zones, setZones] = useState<any[]>([]);
  const [racks, setRacks] = useState<any[]>([]);
  const [shelves, setShelves] = useState<any[]>([]);
  const [bins, setBins] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      if (activeTab === 'zones') {
        const { data } = await supabase.from('warehouse_zones').select('*').order('name');
        setZones(data || []);
      } else if (activeTab === 'racks') {
        const { data } = await supabase.from('warehouse_racks').select('*, zone:warehouse_zones(name)').order('name');
        setRacks(data || []);
      } else if (activeTab === 'shelves') {
        const { data } = await supabase.from('warehouse_shelves').select('*, rack:warehouse_racks(name, zone:warehouse_zones(name))').order('name');
        setShelves(data || []);
      } else if (activeTab === 'bins') {
        const { data } = await supabase.from('warehouse_bins').select('*, shelf:warehouse_shelves(name, rack:warehouse_racks(name, zone:warehouse_zones(name)))').order('name');
        setBins(data || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: 'zones', name: 'Zones', icon: MapPin },
    { id: 'racks', name: 'Racks', icon: Grid },
    { id: 'shelves', name: 'Shelves', icon: Layers },
    { id: 'bins', name: 'Bins', icon: Box },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Warehouse Layout</h1>
          <p className="text-sm text-gray-500 mt-1">Configure storage zones, racks, shelves, and individual bins.</p>
        </div>
        <button className="bg-[#0047ff] text-white px-4 py-2 rounded-lg font-medium text-sm flex items-center hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Add New {activeTab.slice(0, -1)}
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm flex items-center justify-center
                  ${activeTab === tab.id
                    ? 'border-[#0047ff] text-[#0047ff]'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                <tab.icon className={`w-4 h-4 mr-2 ${activeTab === tab.id ? 'text-[#0047ff]' : 'text-gray-400'}`} />
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6 border-b border-gray-200 flex items-center justify-between bg-gray-50/50">
          <div className="relative max-w-sm w-full">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={`Search ${activeTab}...`}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-[#0047ff] focus:border-[#0047ff] sm:text-sm transition duration-150 ease-in-out"
            />
          </div>
        </div>

        <div className="overflow-x-auto min-h-[400px]">
          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-[#0047ff]" />
            </div>
          ) : (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  {activeTab !== 'zones' && (
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location Path
                    </th>
                  )}
                  {activeTab === 'zones' && (
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                  )}
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {(activeTab === 'zones' ? zones : activeTab === 'racks' ? racks : activeTab === 'shelves' ? shelves : bins).map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-lg bg-blue-50 text-[#0047ff]">
                          {activeTab === 'zones' && <MapPin className="h-5 w-5" />}
                          {activeTab === 'racks' && <Grid className="h-5 w-5" />}
                          {activeTab === 'shelves' && <Layers className="h-5 w-5" />}
                          {activeTab === 'bins' && <Box className="h-5 w-5" />}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        </div>
                      </div>
                    </td>
                    {activeTab !== 'zones' && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">
                          {activeTab === 'racks' && `${item.zone?.name} > ${item.name}`}
                          {activeTab === 'shelves' && `${item.rack?.zone?.name} > ${item.rack?.name} > ${item.name}`}
                          {activeTab === 'bins' && `${item.shelf?.rack?.zone?.name} > ${item.shelf?.rack?.name} > ${item.shelf?.name} > ${item.name}`}
                        </div>
                      </td>
                    )}
                    {activeTab === 'zones' && (
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{item.description || '-'}</div>
                      </td>
                    )}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-[#0047ff] hover:text-blue-900 mx-2">Edit</button>
                      <button className="text-red-600 hover:text-red-900 mx-2">Delete</button>
                    </td>
                  </tr>
                ))}
                {((activeTab === 'zones' && zones.length === 0) ||
                  (activeTab === 'racks' && racks.length === 0) ||
                  (activeTab === 'shelves' && shelves.length === 0) ||
                  (activeTab === 'bins' && bins.length === 0)) && (
                  <tr>
                    <td colSpan={activeTab === 'zones' ? 3 : 3} className="px-6 py-12 text-center text-gray-500">
                      <p className="text-base font-medium text-gray-900">No {activeTab} found</p>
                      <p className="mt-1 text-sm">Get started by creating a new {activeTab.slice(0, -1)}.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
