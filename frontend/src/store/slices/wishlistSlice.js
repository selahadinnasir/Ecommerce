import { createSlice } from '@reduxjs/toolkit';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  items: user
    ? JSON.parse(localStorage.getItem(`wishlistItems_${user._id}`)) || []
    : [],
};

// Save Wishlist to localStorage helper
const saveWishlist = (userId, items) => {
  if (!userId) return;
  localStorage.setItem(`wishlistItems_${userId}`, JSON.stringify(items));
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    // Replace wishlist completely (used on login)
    setWishlist: (state, action) => {
      const { userId, items } = action.payload;
      console.log('sent wishlist', items, 'existed', state.items);

      state.items = items;
      saveWishlist(userId, state.items);
    },

    // ADD only
    addToWishlist: (state, action) => {
      const { userId, items } = action.payload;

      // prevent duplicates
      if (!state.items.includes(items.product)) {
        state.items.push(items);
      }
      saveWishlist(userId, state.items);
    },

    // REMOVE only
    removeFromWishlist: (state, action) => {
      const { id, userId } = action.payload;
      state.items = state.items.filter((i) => i.product !== id);
      saveWishlist(userId, state.items);
    },

    // Clear wishlist completely (used on logout and when we want clear all)
    clearWishlist: (state, action) => {
      const userId = action.payload;
      state.items = [];
      localStorage.removeItem(`wishlistItems_${userId}`);
      localStorage.removeItem(`cartItems_${userId}`);
    },
  },
});

export const { setWishlist, addToWishlist, removeFromWishlist, clearWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
