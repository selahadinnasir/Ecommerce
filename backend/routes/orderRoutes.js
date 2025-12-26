// routes/orderRoutes.js
import express from 'express';
import {
  addOrderItems,
  getMyOrders,
  getOrderById,
  deleteAllOrders,
  updateOrderToPaid,
  updateOrderStatus,
  updateOrderToDelivered,
  getAllOrders,
} from '../controllers/orderController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { admin } from '../middlewares/adminMiddleware.js'; // We'll create admin check middleware next

const router = express.Router();

// Create order
router.route('/').post(protect, addOrderItems);

// Mark order as paid (after Stripe)
router.route('/:id/pay').put(protect, updateOrderToPaid);

// Update order status (Admin only)
router.put('/:id/deliver', protect, admin, updateOrderToDelivered);
router.route('/:id/status').put(protect, admin, updateOrderStatus);

// delete all orders (for testing purposes)
router.delete('/', deleteAllOrders);

// Get all orders (Admin only)
router.route('/').get(protect, admin, getAllOrders);

// Get logged-in user's orders
router.route('/myorders').get(protect, getMyOrders);

// Get specific order
router.route('/:id').get(protect, getOrderById);

export default router;
