import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, Loader2, Edit2, Lock, ListPlus } from 'lucide-react';
import { DocumentUploader } from './DocumentUploader';

export function ProjectDetails() {
  const { id } = useParams();
  const [project, setProject] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProject();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const fetchProject = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*, buyers(company_name)')
      .eq('id', id)
      .single();
      
    if (error) {
      console.error('Error fetching project:', error);
    } else {
      setProject(data);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-[#0047ff]" />
      </div>
    );
  }

  if (!project) {
    return <div className="text-center py-12 text-gray-500">Project not found</div>;
  }

  const isLocked = project.status !== 'Draft';

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link to="/dashboard/merchandiser/projects" className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Project: {project.order_number}</h1>
            <p className="text-sm text-gray-500 mt-1">{project.buyers?.company_name} - {project.product_name}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 capitalize">
            {project.status}
          </span>
          <Link
            to={`/dashboard/merchandiser/projects/${project.id}/bom`}
            className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-[#0047ff] hover:bg-blue-50 hover:border-[#0047ff] flex items-center justify-center transition-colors"
            title="Bill of Materials"
          >
            <ListPlus className="w-5 h-5" />
          </Link>
          <button 
            disabled={isLocked}
            className={`p-2 rounded-lg border flex items-center justify-center transition-colors
              ${isLocked 
                ? 'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' 
                : 'bg-white border-gray-200 text-gray-600 hover:text-[#0047ff] hover:bg-blue-50 hover:border-[#0047ff]'
              }`}
            title={isLocked ? "Editing locked while in production" : "Edit Project"}
          >
            {isLocked ? <Lock className="w-5 h-5" /> : <Edit2 className="w-5 h-5" />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Technical Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest">Quantity</p>
                <p className="text-sm font-semibold mt-1">{project.quantity}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest">Category</p>
                <p className="text-sm font-semibold mt-1">{project.category || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest">Gauge</p>
                <p className="text-sm font-semibold mt-1">{project.gauge || '-'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest">Yarn Type</p>
                <p className="text-sm font-semibold mt-1">{project.yarn_type || '-'}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Project Documents</h2>
            <DocumentUploader projectId={project.id} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Schedule</h2>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest">Delivery Date</p>
                <p className="text-sm font-semibold mt-1">
                  {project.delivery_date ? new Date(project.delivery_date).toLocaleDateString() : 'Unscheduled'}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest">Priority</p>
                <p className="text-sm font-semibold mt-1">{project.priority}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
