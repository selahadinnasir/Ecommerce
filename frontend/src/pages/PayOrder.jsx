import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import StripePaymentForm from '../components/StripePaymentForm';
import API from '../services/api';

const PayOrder = () => {
  const { id } = useParams();

  const { data: order, isLoading } = useQuery({
    queryKey: ['order', id],
    queryFn: async () => {
      const { data } = await API.get(`/orders/${id}`);
      return data;
    },
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <StripePaymentForm
      orderId={order._id}
      total={order.totalPrice}
      userEmail={order.user.email}
    />
  );
};

export default PayOrder;
