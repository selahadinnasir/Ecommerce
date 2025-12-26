import { useQuery } from '@tanstack/react-query';
import { getCart } from '../services/cartApi';

const useCart = () =>
  useQuery({
    queryKey: ['cart'],
    queryFn: getCart,
  });

export default useCart;
