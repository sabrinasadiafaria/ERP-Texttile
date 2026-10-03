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
import { PendingApproval } from '@/pages/auth/PendingApproval';

// Dashboard Components
import { ProtectedRoute } from '@/components/layout/ProtectedRoute';
import { RoleProtectedRoute } from '@/components/layout/RoleProtectedRoute';
import { getRolePath, PRODUCTION_DEPARTMENTS } from '@/lib/roles';
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

// Admin Pages
import { UserManagement } from '@/pages/admin/UserManagement';
import { ActivityLogs } from '@/pages/admin/ActivityLogs';

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
      { path: 'pending-approval', element: <PendingApproval /> },
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
              <RoleProtectedRoute allowedRoles={['Director']} module="dashboard">
                <Outlet />
              </RoleProtectedRoute>
            ),
            children: [{ index: true, element: <DirectorDashboard /> }],
          },
          {
            path: 'admin',
            element: (
              <RoleProtectedRoute module="users" action="manage">
                <Outlet />
              </RoleProtectedRoute>
            ),
            children: [
              { index: true, element: <AdminDashboard /> },
              { path: 'users', element: <UserManagement /> },
              { path: 'logs', element: <ActivityLogs /> },
            ],
          },
          {
            path: 'merchandiser',
            element: (
              <RoleProtectedRoute module="projects" action="view">
                <Outlet />
              </RoleProtectedRoute>
            ),
            children: [
              { index: true, element: <MerchandiserDashboard /> },
              { path: 'buyers', element: <BuyersList /> },
              { path: 'buyers/new', element: <RoleProtectedRoute module="buyers" action="create"><BuyerForm /></RoleProtectedRoute> },
              { path: 'boms', element: <BOMsList /> },
              { path: 'pos', element: <PurchaseOrdersList /> },
              { path: 'reports', element: <MerchandiserReports /> },
            ],
          },
          {
            path: 'yarn-manager',
            element: (
              <RoleProtectedRoute module="yarn" action="view">
                <Outlet />
              </RoleProtectedRoute>
            ),
            children: [
              { index: true, element: <YarnManagerDashboard /> },
              { path: 'suppliers', element: <RoleProtectedRoute module="suppliers" action="view"><SuppliersLayout /></RoleProtectedRoute>, children: [
                { index: true, element: <SuppliersList /> },
                { path: 'new', element: <SupplierForm /> },
              ]},
              { path: 'purchase-orders', element: <PurchaseOrderQueue /> },
              { path: 'yarn-master', element: <YarnMaster /> },
              { path: 'receipts', element: <GoodsReceipts /> },
              { path: 'inventory', element: <YarnInventory /> },
              { path: 'reservations', element: <YarnReservations /> },
            ],
          },
          {
            path: 'inventory-manager',
            element: (
              <RoleProtectedRoute module="inventory" action="view">
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
          // One route per production role, generated from the department config.
          // A role may only open ITS OWN department (module = department key).
          ...PRODUCTION_DEPARTMENTS.flatMap((d) =>
            [d.pmRole, d.apmRole].map((role) => ({
              path: getRolePath(role),
              element: (
                <RoleProtectedRoute allowedRoles={[role]} module={d.department} action="view">
                  <DepartmentDashboard />
                </RoleProtectedRoute>
              ),
            }))
          ),
          {
            path: 'projects',
            element: (
              <RoleProtectedRoute module="projects" action="view">
                <Outlet />
              </RoleProtectedRoute>
            ),
            children: [
              { index: true, element: <ProjectsList /> },
              { path: 'new', element: <RoleProtectedRoute module="projects" action="create"><ProjectWizard /></RoleProtectedRoute> },
              { path: ':id', element: <ProjectDetails /> },
              { path: ':id/bom', element: <RoleProtectedRoute module="bom" action="view"><BOMBuilder /></RoleProtectedRoute> },
            ],
          },
          {
            path: 'kpos',
            element: (
              <RoleProtectedRoute module="knitting" action="view">
                <KPOGeneration />
              </RoleProtectedRoute>
            ),
          },
          {
            path: 'transfers',
            element: (
              <RoleProtectedRoute module="transfers" action="view">
                <TransfersPage />
              </RoleProtectedRoute>
            ),
          },
          {
            path: 'yarn-requests',
            element: (
              <RoleProtectedRoute module="yarn_requests" action="view">
                <YarnRequestPage />
              </RoleProtectedRoute>
            ),
          },
          {
            path: 'activity-log',
            element: (
              <RoleProtectedRoute module="activity" action="view">
                <ActivityLogPage />
              </RoleProtectedRoute>
            ),
          },
          {
            path: 'settings',
            element: (
              <RoleProtectedRoute module="settings" action="manage">
                <SettingsPage />
              </RoleProtectedRoute>
            ),
          },
        ],
      },
    ],
  },
]);