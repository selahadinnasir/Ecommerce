import { NavLink } from 'react-router-dom';

// Sidebar navigation for admin panel
const AdminSidebar = () => {
  const linkClass = 'block px-4 py-2 rounded hover:bg-gray-200';

  return (
    <aside className="w-64 bg-white shadow p-4">
      <h2 className="text-xl font-bold mb-6">Admin</h2>

      <nav className="flex flex-col gap-2">
        <NavLink to="/admin" className={linkClass}>
          Dashboard
        </NavLink>
        <NavLink to="/admin/products" className={linkClass}>
          Products
        </NavLink>
        <NavLink to="/admin/orders" className={linkClass}>
          Orders
        </NavLink>
        <NavLink to="/admin/users" className={linkClass}>
          Users
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
