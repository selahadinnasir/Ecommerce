// Detailed product page with add to cart, wishlist, and reviews
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import API from '../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';
import {
  addToWishlist,
  removeFromWishlist,
} from '../store/slices/wishlistSlice';
import ReviewSection from '../components/ReviewSection';
import { ShoppingCart, Heart } from 'lucide-react';
import toast from 'react-hot-toast';

const fetchProduct = async (id) => {
  const res = await API.get(`/products/${id}`);
  return res.data;
};

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const authUser = user || {};

  const { data, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProduct(id),
  });

  const { items: wishlistItems } = useSelector((state) => state.wishlist);

  console.log('ish items', wishlistItems);
  if (isLoading)
    return <p className="p-10 text-center text-gray-500">Loading product…</p>;

  if (error)
    return (
      <p className="p-10 text-center text-red-500">Failed to load product</p>
    );

  const product = data;

  const isWishlisted = wishlistItems.some(
    (item) => item.product === product._id
  );

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        userId: authUser._id,
        cartItems: {
          product: product._id,
          name: product.name,
          image: product.image,
          price: product.price,
          quantity: 1,
        },
      })
    );
    toast.success('Product added to cart');
  };

  const handleWishList = () => {
    if (isWishlisted) {
      dispatch(
        removeFromWishlist({
          id: product._id,
          userId: user._id,
        })
      );
      toast.success('Removed from wishlist');
    } else {
      dispatch(
        addToWishlist({
          userId: authUser._id,
          items: {
            product: product._id,
            name: product.name,
            image: product.image,
            price: product.price,
          },
        })
      );
      toast.success('Added to wishlist');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Product main section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-xl shadow-sm p-8">
          {/* Image */}
          <div className="flex items-center justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-h-[420px] object-contain rounded-lg"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-gray-900 mb-3">
                {product.name}
              </h1>

              <p className="text-gray-600 leading-relaxed mb-6">
                {product.description}
              </p>

              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-black">
                  ${product.price}
                </span>
                <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
                  In Stock
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-2 bg-black text-white p-3 rounded-lg hover:bg-gray-800 transition font-medium"
              >
                <ShoppingCart size={18} />
                Add to Cart
              </button>

              <button
                onClick={handleWishList}
                className="flex items-center justify-center gap-2 border border-gray-300 p-3 rounded-lg hover:bg-gray-100 transition font-medium"
              >
                <Heart
                  size={20}
                  className={`transition ${
                    isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'
                  }`}
                />
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">
            Customer Reviews
          </h2>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <ReviewSection productId={product._id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
