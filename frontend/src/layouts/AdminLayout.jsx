import AdminSidebar from '../components/admin/AdminSidebar';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Overlay (mobile only) */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top bar (mobile) */}
        <div className="lg:hidden bg-white border-b px-4 py-3 flex items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-700 text-2xl"
          >
            ☰
          </button>
          <span className="ml-4 font-semibold">Admin Panel</span>
        </div>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
