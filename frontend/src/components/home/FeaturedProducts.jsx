import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import API from '../../services/api';

const fetchProducts = async () => {
  const res = await API.get('/products', { params: { page: 1 } });
  return res.data.products;
};

const FeaturedProducts = () => {
  const { data: products = [], isLoading } = useQuery({
    queryKey: ['featured-products'],
    queryFn: fetchProducts,
  });

  if (isLoading) return null;

  return (
    <section className="bg-white py-16 mt-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">
            Featured Products
          </h2>
          <p className="text-gray-600 mt-2">Hand-picked items just for you</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.slice(0, 8).map((product) => (
            <Link
              key={product._id}
              to={`/products/${product._id}`}
              className="bg-gray-50 rounded-xl shadow hover:shadow-xl transition overflow-hidden"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-56 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold truncate">{product.name}</h3>
                <p className="text-gray-600">${product.price}</p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/products"
            className="inline-block px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Browse All Products
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
