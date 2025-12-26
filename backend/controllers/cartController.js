import Cart from '../models/Cart.js';

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    res.json(cart || { cartItems: [] });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update user cart (add/update items)
// @route   POST /api/cart
// @access  Private
export const updateCart = async (req, res) => {
  // console.log('cart reqBody:', req.body);
  // console.log('cart req.body.cartItems:', req.body.cartItems);

  try {
    const { cartItems } = req.body;

    const cart = await Cart.findOneAndUpdate(
      { user: req.user._id },
      { cartItems },
      { new: true, upsert: true }
    );

    res.status(201).json(cart);
    console.log('cart updated sucss');
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
    console.error('error', error.message);
  }
};

// @desc    Clear user cart (optional after order placed)
// @route   DELETE /api/cart
// @access  Private

// this is no longer needed we did everthing in frontend , here we just save what we get

// export const clearCart = async (req, res) => {
//   try {
//     await Cart.findOneAndDelete({ user: req.user._id });
//     res.json({ message: 'Cart cleared' });
//   } catch (error) {
//     res.status(500).json({ message: 'Server error' });
//   }
// };
