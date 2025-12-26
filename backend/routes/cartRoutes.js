import express from 'express';
import { getCart, updateCart } from '../controllers/cartController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getCart).post(protect, updateCart);

// not used
// .delete(protect, clearCart);

export default router;
