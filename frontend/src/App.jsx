import { RouterProvider } from 'react-router-dom';
import router from './router';
import { Toaster } from 'react-hot-toast';
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { setCart } from './store/slices/cartSlice';

function App() {
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   const user = JSON.parse(localStorage.getItem('user'));

  //   const cartItems = user
  //     ? JSON.parse(localStorage.getItem(`cartItems_${user._id}`)) || []
  //     : [];

  //   dispatch(
  //     setCart({
  //       userId: user?._id,
  //       cartItems,
  //     })
  //   );
  // }, [dispatch]);

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
