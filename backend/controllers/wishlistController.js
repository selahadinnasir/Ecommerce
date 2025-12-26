import Wishlist from '../models/Wishlist.js';

// @desc    Get logged-in user's wishlist
// @route   GET /api/wishlist
// @access  Private
export const getWishlist = async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.user._id });
  res.json(wishlist || { items: [] });
};

// @desc    Add/update wishlist items
// @route   POST /api/wishlist
// @access  Private
export const updateWishlist = async (req, res) => {
  const { items } = req.body;
  // console.log('wish items', items);

  const wishlist = await Wishlist.findOneAndUpdate(
    { user: req.user._id }, // filter
    { items }, // update
    { new: true, upsert: true } // options: return updated, create if not exist
  );

  res.status(201).json(wishlist);
};

// @desc    Remove wishlist
// @route   DELETE /api/wishlist
// @access  Private
// export const clearWishlist = async (req, res) => {
//   await Wishlist.findOneAndDelete({ user: req.user._id });
//   res.json({ message: 'Wishlist cleared' });
// };
