import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { 
  Clock, 
  CheckCircle2,
  Activity,
  Loader2
} from 'lucide-react';
import { productionService, DEPARTMENTS } from '@/lib/services/productionService';
import { Button } from '@/components/ui/Button';
import { DirectorDashboard } from './DirectorDashboard';

interface RoleDashboardProps {
  roleName: string;
}

export function RoleDashboard({ roleName }: RoleDashboardProps) {
  const { profile } = useAuth();
  
  if (roleName === 'Director') {
    return <DirectorDashboard />;
  }

  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<any[]>([]);
  const [incomingTransfers, setIncomingTransfers] = useState<any[]>([]);

  // Find department config
  const departmentConfig = Object.values(DEPARTMENTS).find(
    d => d.pmRole === roleName || d.apmRole === roleName
  );

  const isPM = departmentConfig?.pmRole === roleName;
  const isAPM = departmentConfig?.apmRole === roleName;

  useEffect(() => {
    if (departmentConfig) {
      fetchDashboardData();
    } else {
      setLoading(false);
    }
  }, [departmentConfig]);

  const fetchDashboardData = async () => {
    if (!departmentConfig) return;
    setLoading(true);
    try {
      const [tData, iData] = await Promise.all([
        productionService.getDepartmentTasks(departmentConfig.department),
        productionService.getIncomingTransfers(departmentConfig.department)
      ]);
      setTasks(tData || []);
      setIncomingTransfers(iData || []);
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const handleAcceptTransfer = async (transferId: string, quantity: number) => {
    if (!profile?.id) return;
    try {
      await productionService.acceptTransfer(transferId, profile.id, quantity, 0, 0);
      fetchDashboardData();
    } catch (e) {
      console.error("Error accepting transfer", e);
    }
  };

  const handleUpdateProduction = async (recordId: string, planned: number) => {
    if (!profile?.id) return;
    try {
      // Simplification: APM logs everything produced successfully
      await productionService.logProduction(recordId, profile.id, planned, 0, 0);
      fetchDashboardData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleCompleteAndTransfer = async (recordId: string) => {
    if (!profile?.id || !departmentConfig?.nextDepartment) return;
    try {
      await productionService.completeAndTransfer(recordId, profile.id, departmentConfig.nextDepartment);
      fetchDashboardData();
    } catch (e) {
      console.error(e);
    }
  };

  if (loading) {
    return <div className="flex h-64 items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-blue-600" /></div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
            {roleName} Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Welcome back, {profile?.full_name || 'User'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Active Tasks', value: tasks.length.toString(), icon: Activity, color: 'text-blue-600', bg: 'bg-blue-100' },
          { label: 'Pending Transfers', value: incomingTransfers.length.toString(), icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-100' },
          { label: 'Completed', value: tasks.filter(t => t.status === 'COMPLETED').length.toString(), icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-100' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center">
            <div className={`p-3 rounded-lg ${stat.bg} ${stat.color} mr-4`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {departmentConfig && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Incoming Transfers (PM receives work) */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Incoming Transfers (From {departmentConfig.previousDepartment || 'Yarn/Stores'})</h2>
            <div className="space-y-4">
              {incomingTransfers.length === 0 && <p className="text-sm text-gray-500">No pending transfers.</p>}
              {incomingTransfers.map((t) => (
                <div key={t.id} className="p-4 border rounded-lg bg-gray-50 flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-sm">Project: {t.projects?.order_number}</p>
                    <p className="text-xs text-gray-500">Qty: {t.quantity}</p>
                  </div>
                  {isPM && (
                    <Button onClick={() => handleAcceptTransfer(t.id, t.quantity)} size="sm" className="bg-[#0047ff]">
                      Accept
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Active Tasks (APM works, PM approves) */}
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Active Production</h2>
            <div className="space-y-4">
              {tasks.length === 0 && <p className="text-sm text-gray-500">No active production tasks.</p>}
              {tasks.map((task) => (
                <div key={task.id} className="p-4 border rounded-lg bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-semibold text-sm">Project: {task.projects?.order_number}</p>
                      <p className="text-xs text-gray-500">Status: {task.status} | Input Qty: {task.input_quantity}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    {isAPM && task.status === 'RECEIVED' && (
                      <Button onClick={() => handleUpdateProduction(task.id, task.input_quantity)} size="sm" className="bg-green-600">
                        Log Production Complete
                      </Button>
                    )}
                    {isPM && task.status === 'QC_PENDING' && (
                      <Button onClick={() => handleCompleteAndTransfer(task.id)} size="sm" className="bg-[#0047ff]">
                        Approve & Transfer to {departmentConfig.nextDepartment}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

