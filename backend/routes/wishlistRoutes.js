import express from 'express';
import {
  getWishlist,
  updateWishlist,
} from '../controllers/wishlistController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/').get(protect, getWishlist).post(protect, updateWishlist);
// .delete(protect, clearWishlist);

export default router;
