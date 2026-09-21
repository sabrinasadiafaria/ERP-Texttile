import { createBrowserRouter, Outlet } from 'react-router-dom';
import { PublicLayout } from '@/components/layout/PublicLayout';
import { Home } from '@/pages/Home';
import { Products } from '@/pages/Products';
import { Contact } from '@/pages/Contact';
import { Capabilities } from '@/pages/Capabilities';
import { Sustainability } from '@/pages/Sustainability';
import { Certifications } from '@/pages/Certifications';
import { About } from '@/pages/About';

// Auth Pages
import { Login } from '@/pages/auth/Login';
import { Signup } from '@/pages/auth/Signup';
import { ForgotPassword } from '@/pages/auth/ForgotPassword';
import { ResetPassword } from '@/pages/auth/ResetPassword';

// Dashboard Components
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { RoleProtectedRoute } from '@/components/layout/RoleProtectedRoute';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { DashboardRedirect } from '@/pages/dashboards/DashboardRedirect';
import { DirectorDashboard } from '@/pages/dashboards/DirectorDashboard';
import { AdminDashboard } from '@/pages/dashboards/AdminDashboard';
import { DepartmentDashboard } from '@/pages/dashboards/DepartmentDashboard';
import { TransfersPage } from '@/pages/transfers/TransfersPage';
import { YarnRequestPage } from '@/pages/yarn-request/YarnRequestPage';
import { ActivityLogPage } from '@/pages/activity-log/ActivityLogPage';
import { SettingsPage } from '@/pages/settings/SettingsPage';

// Merchandiser Pages
import { MerchandiserDashboard } from '@/pages/merchandiser/MerchandiserDashboard';
import { BuyersList } from '@/pages/merchandiser/BuyersList';
import { BuyerForm } from '@/pages/merchandiser/BuyerForm';
import { ProjectsList } from '@/pages/merchandiser/ProjectsList';
import { ProjectWizard } from '@/pages/merchandiser/ProjectWizard';
import { ProjectDetails } from '@/pages/merchandiser/ProjectDetails';
import { BOMBuilder } from '@/pages/merchandiser/BOMBuilder';
import { BOMsList } from '@/pages/merchandiser/BOMsList';
import { PurchaseOrdersList } from '@/pages/merchandiser/PurchaseOrdersList';
import { MerchandiserReports } from '@/pages/merchandiser/MerchandiserReports';

// Yarn Manager Pages
import { YarnManagerDashboard } from '@/pages/yarn-manager/YarnManagerDashboard';
import { SuppliersList, SupplierForm, SuppliersLayout } from '@/pages/yarn-manager/Suppliers';
import { PurchaseOrderQueue } from '@/pages/yarn-manager/PurchaseOrderQueue';
import { YarnMaster } from '@/pages/yarn-manager/YarnMaster';
import { GoodsReceipts } from '@/pages/yarn-manager/GoodsReceipts';
import { YarnInventory } from '@/pages/yarn-manager/YarnInventory';
import { YarnReservations } from '@/pages/yarn-manager/YarnReservations';
import { KPOGeneration } from '@/pages/yarn-manager/KPOGeneration';

// Inventory Manager Pages
import { InventoryDashboard } from '@/pages/inventory-manager/InventoryDashboard';
import { MaterialReceiving } from '@/pages/inventory-manager/MaterialReceiving';
import { MaterialVerification } from '@/pages/inventory-manager/MaterialVerification';
import { WarehouseManagement } from '@/pages/inventory-manager/WarehouseManagement';
import { MaterialRequests } from '@/pages/inventory-manager/MaterialRequests';
import { MaterialIssues } from '@/pages/inventory-manager/MaterialIssues';
import { Exceptions } from '@/pages/inventory-manager/Exceptions';
import { FinishedGoods } from '@/pages/inventory-manager/FinishedGoods';
import { InventoryReports } from '@/pages/inventory-manager/InventoryReports';

const ROLES = [
  'Inventory & Store Manager',
  'Knitting PM',
  'Knitting APM',
  'Linking PM',
  'Linking APM',
  'Cutting & Trimming PM',
  'Cutting & Trimming APM',
  'Production PM',
  'Production APM'
];

function roleToPath(role: string): string {
  // Replace & first (with -), then spaces (with -)
  return role.toLowerCase().replace(/&/g, '-').replace(/\s+/g, '-');
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      { path: 'products', element: <Products /> },
      { path: 'capabilities', element: <Capabilities /> },
      { path: 'sustainability', element: <Sustainability /> },
      { path: 'certifications', element: <Certifications /> },
      { path: 'contact', element: <Contact /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
      { path: 'reset-password', element: <ResetPassword /> },
    ],
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <DashboardRedirect /> },
          {
            path: 'director',
            element: (
              <RoleProtectedRoute allowedRoles={['Director']}>
                <Outlet />
              </RoleProtectedRoute>
            ),
            children: [
              { index: true, element: <DirectorDashboard /> },
            ],
          },
          {
            path: 'admin',
            element: (
              <RoleProtectedRoute allowedRoles={['Admin']}>
                <Outlet />
              </RoleProtectedRoute>
            ),
            children: [
              { index: true, element: <AdminDashboard /> },
              { path: 'users', element: <AdminDashboard /> },
              { path: 'departments', element: <AdminDashboard /> },
            ],
          },
          {
            path: 'merchandiser',
            element: (
              <RoleProtectedRoute allowedRoles={['Director', 'Admin', 'Merchandiser']}>
                <Outlet />
              </RoleProtectedRoute>
            ),
            children: [
              { index: true, element: <MerchandiserDashboard /> },
              { path: 'buyers', element: <BuyersList /> },
              { path: 'buyers/new', element: <BuyerForm /> },
              { path: 'projects', element: <ProjectsList /> },
              { path: 'projects/new', element: <ProjectWizard /> },
              { path: 'projects/:id', element: <ProjectDetails /> },
              { path: 'projects/:id/bom', element: <BOMBuilder /> },
              { path: 'boms', element: <BOMsList /> },
              { path: 'pos', element: <PurchaseOrdersList /> },
              { path: 'reports', element: <MerchandiserReports /> },
            ],
          },
          {
            path: 'yarn-manager',
            element: (
              <RoleProtectedRoute allowedRoles={['Director', 'Admin', 'Yarn Manager']}>
                <Outlet />
              </RoleProtectedRoute>
            ),
            children: [
              { index: true, element: <YarnManagerDashboard /> },
              { path: 'suppliers', element: <SuppliersLayout />, children: [
                { index: true, element: <SuppliersList /> },
                { path: 'new', element: <SupplierForm /> },
              ]},
              { path: 'purchase-orders', element: <PurchaseOrderQueue /> },
              { path: 'yarn-master', element: <YarnMaster /> },
              { path: 'receipts', element: <GoodsReceipts /> },
              { path: 'inventory', element: <YarnInventory /> },
              { path: 'reservations', element: <YarnReservations /> },
              { path: 'kpos', element: <KPOGeneration /> },
            ],
          },
          {
            path: 'inventory-manager',
            element: (
              <RoleProtectedRoute allowedRoles={['Director', 'Admin', 'Inventory & Store Manager']}>
                <Outlet />
              </RoleProtectedRoute>
            ),
            children: [
              { index: true, element: <InventoryDashboard /> },
              { path: 'receiving', element: <MaterialReceiving /> },
              { path: 'verification', element: <MaterialVerification /> },
              { path: 'warehouse', element: <WarehouseManagement /> },
              { path: 'requests', element: <MaterialRequests /> },
              { path: 'issues', element: <MaterialIssues /> },
              { path: 'exceptions', element: <Exceptions /> },
              { path: 'finished-goods', element: <FinishedGoods /> },
              { path: 'reports', element: <InventoryReports /> },
            ],
          },
          ...ROLES.map((role) => {
            const rolePath = roleToPath(role);
            return {
              path: rolePath,
              element: (
                <RoleProtectedRoute allowedRoles={[role]}>
                  <DepartmentDashboard />
                </RoleProtectedRoute>
              ),
            };
          }),
          {
            path: 'projects/:id',
            element: (
              <RoleProtectedRoute allowedRoles={['Director', 'Admin', 'Merchandiser', 'Knitting PM', 'Knitting APM', 'Linking PM', 'Linking APM', 'Cutting & Trimming PM', 'Cutting & Trimming APM', 'Production PM', 'Production APM']}>
                <ProjectDetails />
              </RoleProtectedRoute>
            ),
          },

          {
            path: 'transfers',
            element: (
              <RoleProtectedRoute allowedRoles={['Director', 'Admin', 'Merchandiser', 'Yarn Manager', 'Inventory & Store Manager', 'Knitting PM', 'Knitting APM', 'Linking PM', 'Linking APM', 'Cutting & Trimming PM', 'Cutting & Trimming APM', 'Production PM', 'Production APM']}>
                <TransfersPage />
              </RoleProtectedRoute>
            ),
          },
          {
            path: 'yarn-requests',
            element: (
              <RoleProtectedRoute allowedRoles={['Director', 'Admin', 'Merchandiser', 'Yarn Manager', 'Production PM', 'Production APM']}>
                <YarnRequestPage />
              </RoleProtectedRoute>
            ),
          },
          {
            path: 'activity-log',
            element: (
              <RoleProtectedRoute allowedRoles={['Director', 'Admin', 'Merchandiser', 'Yarn Manager', 'Inventory & Store Manager', 'Knitting PM', 'Knitting APM', 'Linking PM', 'Linking APM', 'Cutting & Trimming PM', 'Cutting & Trimming APM', 'Production PM', 'Production APM']}>
                <ActivityLogPage />
              </RoleProtectedRoute>
            ),
          },
          {
            path: 'settings',
            element: (
              <RoleProtectedRoute allowedRoles={['Director', 'Admin']}>
                <SettingsPage />
              </RoleProtectedRoute>
            ),
          },
        ],
      }
    ],
  },
]);
