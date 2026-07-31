import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Plus, Search, Eye, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Link } from 'react-router-dom';

interface Project {
  id: string;
  order_number: string;
  product_name: string;
  quantity: number;
  delivery_date: string;
  status: string;
  priority: string;
  buyers: {
    company_name: string;
  };
}

export function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*, buyers(company_name)')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching projects:', error);
    } else {
      // @ts-ignore
      setProjects(data || []);
    }
    setIsLoading(false);
  };

  const filteredProjects = projects.filter(p => 
    p.order_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.product_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Projects</h1>
          <p className="text-sm text-gray-500 mt-1">Manage production projects from PO to shipment</p>
        </div>
        <Link to="/dashboard/merchandiser/projects/new">
          <Button className="bg-[#0047ff] hover:bg-blue-700 text-white rounded-lg px-4 py-2 flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            Create Project
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex items-center">
          <div className="relative w-full max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search projects by PO..." 
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
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Order No</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Buyer</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Delivery</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Priority</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th className="py-3 px-6 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center">
                    <Loader2 className="w-6 h-6 animate-spin text-gray-400 mx-auto" />
                  </td>
                </tr>
              ) : filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-gray-500 text-sm">
                    No projects found.
                  </td>
                </tr>
              ) : (
                filteredProjects.map((project) => (
                  <tr key={project.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-medium text-gray-900">{project.order_number}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{project.buyers?.company_name}</td>
                    <td className="py-4 px-6">
                      <p className="font-medium text-gray-900 text-sm">{project.product_name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">Qty: {project.quantity}</p>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-600">{project.delivery_date ? new Date(project.delivery_date).toLocaleDateString() : '-'}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium 
                        ${project.priority === 'High' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'}`}>
                        {project.priority}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize bg-blue-50 text-blue-700">
                        {project.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link to={`/dashboard/merchandiser/projects/${project.id}`} className="text-gray-400 hover:text-[#0047ff] transition-colors" title="View Details">
                        <Eye className="w-5 h-5 inline" />
                      </Link>
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
