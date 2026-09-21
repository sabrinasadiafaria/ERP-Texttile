import { useState, useRef, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  Settings,
  Bell,
  LogOut,
  Menu,
  X,
  User as UserIcon,
  ChevronRight,
  Users,
  FolderKanban,
  FileText,
  ShoppingCart,
  BarChart3,
  Warehouse,
  ClipboardCheck,
  Box,
  Factory,
  Truck,
  PackageOpen,
  CheckSquare,
  ArrowLeftRight,
  FileOutput,
  AlertTriangle,
  PackageCheck,
  UserCog,
  Activity,
  Building,
  ArrowRightLeft,
  Search,
} from 'lucide-react';

// (ROLE_NAVIGATION removed, sidebar is now purely dynamic based on Supabase permissions)

// ============================================================================
// LAYOUT COMPONENT
// ============================================================================

export function DashboardLayout() {
  const { profile, signOut, session, setDemoRole, demoRoles, permissions } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const profileRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
  };

  const getBreadcrumb = () => {
    const path = location.pathname.split('/').filter(Boolean);
    return path.map((p, i) => (
      <span key={p} className="flex items-center text-sm">
        {i > 0 && <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />}
        <span className={i === path.length - 1 ? 'font-semibold text-black capitalize' : 'text-gray-500 capitalize'}>
          {p.replace(/-&-/g, ' & ').replace(/-/g, ' ')}
        </span>
      </span>
    ));
  };

  const roleSlug = profile?.role
    ? profile.role.toLowerCase().replace(/&/g, '-').replace(/\s+/g, '-')
    : '';

  // DYNAMIC NAVIGATION BUILDER based on Supabase role_permissions
  const nav = [];
  if (profile?.role && permissions) {
    if (permissions.dashboard) {
      nav.push({ name: 'Dashboard', path: `/dashboard/${roleSlug}`, icon: LayoutDashboard });
    }
    if (permissions.projects && permissions.projects !== 'none') {
      nav.push({ name: 'Buyers', path: '/dashboard/merchandiser/buyers', icon: Users });
      nav.push({ name: 'Projects', path: '/dashboard/merchandiser/projects', icon: FolderKanban });
      nav.push({ name: 'BOMs', path: '/dashboard/merchandiser/boms', icon: FileText });
      nav.push({ name: 'Purchase Orders', path: '/dashboard/merchandiser/pos', icon: ShoppingCart });
    }
    if (permissions.yarn && permissions.yarn !== 'none') {
      nav.push({ name: 'Suppliers', path: '/dashboard/yarn-manager/suppliers', icon: Truck });
      nav.push({ name: 'PO Queue', path: '/dashboard/yarn-manager/purchase-orders', icon: ShoppingCart });
      nav.push({ name: 'Yarn Master', path: '/dashboard/yarn-manager/yarn-master', icon: FileText });
      nav.push({ name: 'Receipts & QA', path: '/dashboard/yarn-manager/receipts', icon: ClipboardCheck });
      nav.push({ name: 'Reservations', path: '/dashboard/yarn-manager/reservations', icon: Box });
      nav.push({ name: 'KPO Generation', path: '/dashboard/yarn-manager/kpos', icon: Factory });
    }
    if (permissions.inventory && permissions.inventory !== 'none') {
      nav.push({ name: 'Receiving', path: '/dashboard/inventory-manager/receiving', icon: PackageOpen });
      nav.push({ name: 'Verification', path: '/dashboard/inventory-manager/verification', icon: CheckSquare });
      nav.push({ name: 'Warehouse', path: '/dashboard/inventory-manager/warehouse', icon: Warehouse });
      nav.push({ name: 'Material Requests', path: '/dashboard/inventory-manager/requests', icon: FileOutput });
      nav.push({ name: 'Material Issues', path: '/dashboard/inventory-manager/issues', icon: ArrowLeftRight });
      nav.push({ name: 'Returns & Adj', path: '/dashboard/inventory-manager/exceptions', icon: AlertTriangle });
      nav.push({ name: 'Finished Goods', path: '/dashboard/inventory-manager/finished-goods', icon: PackageCheck });
    }
    if (permissions.production && permissions.production !== 'none') {
      nav.push({ name: 'Production Workflow', path: '/dashboard/production-pm', icon: Factory });
      nav.push({ name: 'Transfers', path: '/dashboard/transfers', icon: ArrowRightLeft });
    }
    if (permissions.reports && permissions.reports !== 'none') {
      nav.push({ name: 'Reports', path: '/dashboard/merchandiser/reports', icon: BarChart3 });
    }
    if (permissions.admin && permissions.admin !== 'none') {
      nav.push({ name: 'System Users', path: '/dashboard/admin/users', icon: UserCog });
      nav.push({ name: 'Departments', path: '/dashboard/admin/departments', icon: Building });
      nav.push({ name: 'Activity Log', path: '/dashboard/activity-log', icon: Activity });
    }
    nav.push({ name: 'Settings', path: '/dashboard/settings', icon: Settings });
  } else if (profile?.role) {
    // Fallback if permissions haven't loaded yet
    nav.push({ name: 'Overview', path: `/dashboard/${roleSlug}`, icon: LayoutDashboard });
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-64 bg-black text-white flex flex-col
        transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <div>
            <span className="text-sm font-bold tracking-widest text-white">AL-AMIN ERP</span>
            {profile?.role && (
              <span className="block text-[10px] text-gray-400 uppercase tracking-wider mt-0.5">
                {profile.role}
              </span>
            )}
          </div>
          <button className="ml-auto lg:hidden" onClick={() => setIsSidebarOpen(false)}>
            <X className="w-5 h-5 text-gray-400 hover:text-white" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4">
          <nav className="space-y-1 px-3">
            {nav.map((item) => {
              const isActive = location.pathname === item.path ||
                (item.path !== '/dashboard' && location.pathname.startsWith(item.path + '/')) ||
                (item.path !== '/dashboard' && location.pathname === item.path);
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? 'bg-[#0047ff] text-white'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5 mr-3 opacity-75" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4 border-t border-white/10">
          {!session && (
            <div className="mb-3">
              <label className="block text-[10px] uppercase tracking-wider text-gray-400 mb-1.5 px-2">
                Demo Role
              </label>
              <select
                value={profile?.role || ''}
                onChange={(e) => {
                  setDemoRole(e.target.value);
                  window.location.href = '/dashboard';
                }}
                className="w-full bg-white/10 border border-white/10 text-white text-xs rounded-md px-2 py-1.5 focus:outline-none focus:border-[#0047ff]"
              >
                {demoRoles.map((r) => (
                  <option key={r} value={r} className="text-black">{r}</option>
                ))}
              </select>
            </div>
          )}
          <div className="flex items-center mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center mr-3">
              <UserIcon className="w-4 h-4 text-gray-300" />
            </div>
            <div className="overflow-hidden text-sm">
              <p className="font-medium text-white truncate">{profile?.full_name}</p>
              <p className="text-gray-400 text-xs truncate">{profile?.role}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-white/10 transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3 opacity-75" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* Top Navigation */}
        <header className="h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 bg-white border-b border-gray-200">
          <div className="flex items-center flex-1">
            <button
              className="lg:hidden mr-4 text-gray-500 hover:text-black"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden sm:flex items-center">
              {getBreadcrumb()}
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Global Search */}
            <div className="hidden md:block relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects, buyers..."
                className="pl-9 pr-4 py-1.5 w-48 lg:w-64 rounded-lg border border-gray-200 focus:outline-none focus:border-[#0047ff] text-sm"
              />
            </div>
            {/* Notifications Dropdown */}
            <div className="relative" ref={notifRef}>
              <button 
                onClick={() => {
                  setIsNotificationsOpen(!isNotificationsOpen);
                  if (hasUnread) setHasUnread(false);
                  setIsProfileOpen(false);
                }}
                className="p-2 text-gray-400 hover:text-black relative transition-colors rounded-full hover:bg-gray-100"
              >
                {hasUnread && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />}
                <Bell className="w-5 h-5" />
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden transform origin-top-right transition-all">
                  <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                    <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {[
                      { title: 'New Transfer Request', time: '10m ago', unread: true },
                      { title: 'Project 1004 is delayed', time: '1h ago', unread: true },
                      { title: 'Low Yarn Stock: Superfine Merino', time: '3h ago', unread: false },
                      { title: 'System maintenance scheduled', time: '1d ago', unread: false },
                    ].map((n, i) => (
                      <div key={i} className={`px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer ${n.unread ? 'bg-blue-50/20' : ''}`}>
                        <div className="flex justify-between items-start">
                          <p className={`text-sm ${n.unread ? 'font-medium text-gray-900' : 'text-gray-700'}`}>{n.title}</p>
                          {n.unread && <span className="w-2 h-2 bg-[#0047ff] rounded-full mt-1.5"></span>}
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{n.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-100 bg-gray-50/50 text-center">
                    <button className="text-xs font-medium text-[#0047ff] hover:underline">
                      Mark all as read
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Settings Link */}
            <Link to="/dashboard/settings" className="p-2 text-gray-400 hover:text-black transition-colors rounded-full hover:bg-gray-100">
              <Settings className="w-5 h-5" />
            </Link>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <div 
                className="hidden sm:flex items-center space-x-2 pl-2 border-l border-gray-200 ml-2 cursor-pointer hover:bg-gray-50 rounded-lg p-1 transition-colors"
                onClick={() => {
                  setIsProfileOpen(!isProfileOpen);
                  setIsNotificationsOpen(false);
                }}
              >
                <div className="w-7 h-7 rounded-full bg-[#0047ff] flex items-center justify-center text-xs font-bold text-white shadow-sm">
                  {profile?.full_name?.split(' ').map(n => n[0]).join('').slice(0, 2) || 'U'}
                </div>
                <div className="text-xs">
                  <p className="font-medium text-gray-900 truncate">{profile?.full_name}</p>
                </div>
              </div>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 z-50 overflow-hidden transform origin-top-right transition-all">
                  <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                    <p className="text-sm font-semibold text-gray-900 truncate">{profile?.full_name}</p>
                    <p className="text-xs text-gray-500 truncate mt-0.5">{profile?.role}</p>
                  </div>
                  <div className="py-1">
                    <Link to="/dashboard/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#0047ff]">
                      <UserIcon className="w-4 h-4 mr-2" />
                      My Profile
                    </Link>
                    <Link to="/dashboard/settings" className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#0047ff]">
                      <Settings className="w-4 h-4 mr-2" />
                      Preferences
                    </Link>
                  </div>
                  <div className="border-t border-gray-100 py-1">
                    <button 
                      onClick={handleSignOut}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>

      </main>
    </div>
  );
}
