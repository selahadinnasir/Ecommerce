import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16 grid gap-10 md:grid-cols-4">
        {/* Brand */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">MyShop</h3>
          <p className="text-sm text-gray-400">
            Your trusted online store for quality products and smooth shopping.
          </p>
        </div>

        {/* Shop */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Shop</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/products" className="hover:text-white transition">
                All Products
              </Link>
            </li>
            <li>
              <Link to="/wishlist" className="hover:text-white transition">
                Wishlist
              </Link>
            </li>
            <li>
              <Link to="/cart" className="hover:text-white transition">
                Cart
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white transition">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-white transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/" className="hover:text-white transition">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} MyShop. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
