// Shows all products in a modern grid, fetches via React Query
import { useQuery } from '@tanstack/react-query';
import API from '../services/api';
import { Link } from 'react-router-dom';
import ProductSkeleton from '../components/skeletons/ProductSkeleton';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

// Fetch products with pagination + search keyword
const fetchProducts = async (page, keyword) => {
  const res = await API.get('/products', {
    params: {
      page, // current page number
      keyword, // search text from input
    },
  });

  console.log('backend res', res.data);

  return res.data;
};

const Products = () => {
  // this line shows erro: in v5 we need to use object
  // const { data, isLoading, error } = useQuery(['products'], fetchProducts);

  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);

  const [debouncedKeyword, setDebouncedKeyword] = useState(keyword);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 3000);

    return () => clearTimeout(timer);
  }, [keyword]);

  const { data, isLoading, error } = useQuery({
    queryKey: ['products', page, debouncedKeyword],
    queryFn: () => fetchProducts(page, debouncedKeyword),
    keepPreviousData: true,
  });

  console.log('data', data);

  if (isLoading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-lg animate-pulse">
          Loading products...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow border text-center">
          <p className="text-red-500 font-medium mb-4">
            Failed to load products
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );

  return (
    <>
      <Helmet>
        <title>Products | Shop</title>
        <meta name="description" content="Browse all available products" />
      </Helmet>

      <div className="bg-gray-50 min-h-screen px-4 py-10">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Products
          </h1>

          {/* Search */}
          <div className="max-w-xl mx-auto mb-10">
            <input
              type="text"
              value={keyword}
              placeholder="Search products..."
              className="w-full rounded-lg border px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
              onChange={(e) => {
                setPage(1);
                setKeyword(e.target.value);
              }}
            />
          </div>

          {/* Products Grid */}
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {isLoading
              ? Array(8)
                  .fill(0)
                  .map((_, i) => <ProductSkeleton key={i} />)
              : data?.products.map((product) => (
                  <Link
                    to={`/products/${product._id}`}
                    key={product._id}
                    className="group bg-white rounded-xl shadow-sm border overflow-hidden hover:shadow-lg transition"
                  >
                    <div className="overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <div className="p-4">
                      <h2 className="font-semibold text-lg text-gray-900 mb-1">
                        {product.name}
                      </h2>

                      <p className="text-gray-800 font-medium mb-2">
                        ${product.price}
                      </p>

                      <p className="text-sm text-gray-500">
                        {product.description?.slice(0, 60)}...
                      </p>
                    </div>
                  </Link>
                ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-5 py-2 rounded-lg border font-medium hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Prev
            </button>

            <span className="text-gray-700 font-medium">Page {page}</span>

            <button
              onClick={() => setPage((p) => p + 1)}
              className="px-5 py-2 rounded-lg border font-medium hover:bg-gray-100 transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
