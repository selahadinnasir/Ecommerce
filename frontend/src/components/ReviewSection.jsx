// Shows reviews and allows logged-in users to submit a review
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import API from '../services/api';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { Star } from 'lucide-react';

const fetchReviews = async (id) => {
  const res = await API.get(`/products/${id}/reviews`);
  console.log('reviews data', res.data);
  return res.data;
};

const ReviewSection = ({ productId }) => {
  const { user } = useSelector((state) => state.auth);
  const queryClient = useQueryClient();

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(0);

  const { data, isLoading } = useQuery({
    queryKey: ['reviews', productId],
    queryFn: () => fetchReviews(productId),
  });

  const reviewMutation = useMutation({
    mutationFn: (reviewData) =>
      API.post(`/products/${productId}/reviews`, reviewData),

    onSuccess: (res) => {
      // Invalidate queries so reviews reload
      queryClient.invalidateQueries({
        queryKey: ['reviews', productId],
      });

      setComment('');
      setRating(0); // optional: reset rating stars

      // Show backend success message
      toast.success(res.data.message || 'Review submitted successfully 🎉');
    },

    onError: (err) => {
      // Show backend error message
      toast.error(
        err.response?.data?.message ||
          'Failed to submit review. Please try again.'
      );
    },
  });

  const handleReview = (e) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }
    reviewMutation.mutate({ rating, comment });
  };

  if (isLoading) return <p>Loading reviews...</p>;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Reviews</h2>

      {data?.length === 0 && (
        <p className="text-gray-500 mb-4">No reviews yet.</p>
      )}

      {data?.map((rev) => (
        <div
          key={rev._id}
          className="border rounded-lg p-4 hover:shadow-sm transition"
        >
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold text-gray-800">{rev.name}</p>

            {/* Stars */}
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }, (_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < rev.rating ? 'text-yellow-500' : 'text-gray-300'
                  }`}
                  fill={i < rev.rating ? 'currentColor' : 'none'}
                />
              ))}
            </div>
          </div>
          <p className="text-gray-700">{rev.comment}</p>
        </div>
      ))}

      {user && (
        <form
          onSubmit={handleReview}
          className="mt-8 bg-gray-50 p-6 rounded-lg shadow-inner"
        >
          <h3 className="font-semibold text-gray-900 mb-4">Write a review</h3>

          <div className="flex items-center gap-1 mb-3">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={`w-7 h-7 cursor-pointer ${
                  i < rating ? 'text-yellow-500' : 'text-gray-300'
                }`}
                fill={i < rating ? 'currentColor' : 'none'}
                onClick={() => setRating(i + 1)}
              />
            ))}
          </div>

          <textarea
            className="border rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-black resize-none"
            placeholder="Write your review..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
          />

          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-black text-white font-medium hover:bg-gray-800 transition"
          >
            Submit Review
          </button>
        </form>
      )}
    </div>
  );
};

export default ReviewSection;
