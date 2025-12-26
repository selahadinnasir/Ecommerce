import AdminSidebar from '../components/admin/AdminSidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  );
};

export default AdminLayout;
