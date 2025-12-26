import { Link } from 'react-router-dom';
import FeaturedProducts from '../components/home/FeaturedProducts';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Footer from '../layouts/Footer';
function Home() {
  return (
    <>
      {/* Hero Section */}
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Welcome to MyShop
            </h1>
            <p className="text-gray-700 mb-6">
              The best place to find your favorite products online. Browse, shop
              and enjoy seamless checkout.
            </p>
            <Link
              to="/products"
              className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800 transition"
            >
              Browse Products
            </Link>
          </div>

          <div className="flex-1">
            <img
              src="/Hero_img.jpg"
              alt="E-commerce"
              className="rounded shadow-lg w-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* Featured Products Section */}
      <FeaturedProducts />
      <WhyChooseUs />
    </>
  );
}

export default Home;
