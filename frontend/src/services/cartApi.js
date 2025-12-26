import API from './api';

export const getCart = async () => {
  const res = await API.get('/cart');
  return res.data;
};

export const addToCartAPI = async (item) => {
  const res = await API.post('/cart', item);
  return res.data;
};

export const removeFromCartAPI = async (productId) => {
  await API.delete(`/cart/${productId}`);
};
