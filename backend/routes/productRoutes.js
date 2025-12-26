// routes/productRoutes.js
import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import {
  createProductReview,
  getProductReviews,
} from '../controllers/reviewController.js';

import { protect } from '../middlewares/authMiddleware.js';
import { admin } from '../middlewares/adminMiddleware.js';

const router = express.Router();

// Public
router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

router
  .route('/:id/reviews')
  .get(getProductReviews)
  .post(protect, createProductReview);
// Admin only
router.route('/').post(protect, admin, createProduct);
router
  .route('/:id')
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

export default router;
