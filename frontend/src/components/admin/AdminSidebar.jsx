import { NavLink, Link } from 'react-router-dom';

const AdminSidebar = ({ open, onClose }) => {
  const baseLink = 'block px-4 py-2 rounded-md text-sm font-medium transition';

  const activeLink = 'bg-black text-white';
  const inactiveLink = 'text-gray-700 hover:bg-gray-100';

  return (
    <aside
      className={`
        fixed z-50 inset-y-0 left-0 w-64 bg-white border-r shadow-sm
        transform transition-transform duration-300
        ${open ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:z-auto
      `}
    >
      {/* Header */}
      <div className="px-6 py-5 border-b flex items-center justify-between">
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-tight text-gray-900"
        >
          MyShop
        </Link>

        {/* Close button (mobile) */}
        <button onClick={onClose} className="lg:hidden text-xl text-gray-600">
          ✕
        </button>
      </div>

      {/* Navigation */}
      <nav className="px-4 py-6 space-y-2">
        <NavLink
          to="/admin"
          onClick={onClose}
          end
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : inactiveLink}`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/products"
          onClick={onClose}
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : inactiveLink}`
          }
        >
          Products
        </NavLink>

        <NavLink
          to="/admin/orders"
          onClick={onClose}
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : inactiveLink}`
          }
        >
          Orders
        </NavLink>

        <NavLink
          to="/admin/users"
          onClick={onClose}
          className={({ isActive }) =>
            `${baseLink} ${isActive ? activeLink : inactiveLink}`
          }
        >
          Users
        </NavLink>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
