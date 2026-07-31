import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Search, Edit2, Archive, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface Buyer {
  id: string;
  company_name: string;
  contact_person: string;
  email: string;
  phone: string;
  country: string;
  status: string;
}

export function BuyersList() {
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBuyers();
  }, []);

  const fetchBuyers = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('buyers')
      .select('*')
      .order('company_name', { ascending: true });
      
    if (error) {
      console.error('Error fetching buyers:', error);
    } else {
      setBuyers(data || []);
    }
    setIsLoading(false);
  };

  const filteredBuyers = buyers.filter(b => 
    b.company_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.contact_person.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Buyers</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your clients and buyers</p>
        </div>
        <Button className="bg-[#0047ff] hover:bg-blue-700 text-white rounded-lg px-4 py-2 flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Add Buyer
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center">
          <div className="relative w-full max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search buyers..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0047ff]/20 focus:border-[#0047ff]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50/50 border-b border-gray-100">
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Company</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Country</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center">
                    <Loader2 className="w-6 h-6 animate-spin text-gray-400 mx-auto" />
                  </td>
                </tr>
              ) : filteredBuyers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500 text-sm">
                    No buyers found.
                  </td>
                </tr>
              ) : (
                filteredBuyers.map((buyer) => (
                  <tr key={buyer.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <p className="font-medium text-gray-900">{buyer.company_name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{buyer.email}</p>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">
                      <p>{buyer.contact_person}</p>
                      <p className="text-xs text-gray-500">{buyer.phone}</p>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">{buyer.country || '-'}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                        ${buyer.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                      `}>
                        {buyer.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right space-x-3">
                      <button className="text-gray-400 hover:text-[#0047ff] transition-colors" title="Edit">
                        <Edit2 className="w-4 h-4 inline" />
                      </button>
                      <button className="text-gray-400 hover:text-red-600 transition-colors" title="Archive">
                        <Archive className="w-4 h-4 inline" />
                      </button>
                    </td>
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
