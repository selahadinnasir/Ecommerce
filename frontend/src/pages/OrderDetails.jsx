import React from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';
import { useQuery } from '@tanstack/react-query';

const OrderDetails = () => {
  const { id } = useParams();

  const fetchOneOrder = async () => {
    const res = await API.get(`/orders/${id}`);
    return res.data;
  };

  const { data } = useQuery({
    queryKey: ['oneOrder', id],
    queryFn: fetchOneOrder,
  });

  console.log('order detail', data);

  //   useEffect(() => {
  //     const res = API.get(`/orders/${id}`);
  //     console.log('order detail', res.data);
  //   }, [id]);

  return (
    <div>
      <h1>OrderDetails</h1>
    </div>
  );
};

export default OrderDetails;
