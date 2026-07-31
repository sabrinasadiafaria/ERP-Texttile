import { BarChart3, Download, FileText } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function MerchandiserReports() {
  const reports = [
    { title: 'Project Status Report', description: 'Overview of all active projects, their current stages, and BOM statuses.' },
    { title: 'Purchase Order Summary', description: 'Summary of all POs grouped by supplier and approval status.' },
    { title: 'Buyer Performance', description: 'Analytics on order volume and project completion rates per buyer.' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Merchandising Reports</h1>
          <p className="text-sm text-gray-500 mt-1">Generate and export analytics for projects and orders.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col h-full">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-[#0047ff] mr-3">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">{report.title}</h3>
            </div>
            <p className="text-sm text-gray-500 flex-1">{report.description}</p>
            <div className="mt-6 flex space-x-3">
              <Button variant="outline" className="flex-1 text-[#0047ff] border-[#0047ff] hover:bg-blue-50">
                <BarChart3 className="w-4 h-4 mr-2" /> View
              </Button>
              <Button className="flex-1 bg-[#0047ff] hover:bg-blue-700">
                <Download className="w-4 h-4 mr-2" /> Export
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
