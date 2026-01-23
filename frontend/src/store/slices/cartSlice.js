import { createSlice } from '@reduxjs/toolkit';

const user = JSON.parse(localStorage.getItem('user'));

const initialState = {
  items: user
    ? JSON.parse(localStorage.getItem(`cartItems_${user._id}`)) || []
    : [],
};

// Save cart to localStorage helper
const saveCart = (userId, items) => {
  if (!userId) return;
  localStorage.setItem(`cartItems_${userId}`, JSON.stringify(items));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Replace cart completely (used on login)
    setCart: (state, action) => {
      const { userId, cartItems } = action.payload;
      state.items = cartItems;
      saveCart(userId, state.items);
    },

    // Clear cart completely (used on logout / order success)
    clearCart: (state, action) => {
      const userId = action.payload;
      state.items = [];
      localStorage.removeItem(`cartItems_${userId}`);
    },

    // Add item or increase quantity
    addToCart: (state, action) => {
      const { cartItems, userId } = action.payload;

      const existing = state.items.find((i) => i.product === cartItems.product);

      if (existing) {
        existing.quantity += cartItems.quantity;
      } else {
        state.items.push(cartItems);
      }

      saveCart(userId, state.items);
    },
    // Update item quantity
    updateQuantity: (state, action) => {
      const { id, quantity, userId } = action.payload;
      const item = state.items.find((i) => i.product === id);

      if (item) {
        item.quantity = quantity;
      }

      saveCart(userId, state.items);
    },

    // Remove item from cart
    removeFromCart: (state, action) => {
      const { id, userId } = action.payload;
      state.items = state.items.filter((i) => i.product !== id);
      saveCart(userId, state.items);
    },
  },
});

export const { setCart, addToCart, updateQuantity, removeFromCart, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
