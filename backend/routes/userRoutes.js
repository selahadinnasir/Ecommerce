import express from 'express';
import { protect } from '../middlewares/authMiddleware.js';
import { admin } from '../middlewares/adminMiddleware.js'; // We'll create admin check middleware next
import {
  getAllUsers,
  getUserById,
  deleteUser,
  getUserProfile,
  updateUserProfile,
  updatePassword,
  updateUserRole,
} from '../controllers/userController.js';

const router = express.Router();

// User profile routes
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route('/profile/password').put(protect, updatePassword);

router.route('/').get(protect, admin, getAllUsers);
router
  .route('/:id')
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUserRole)
  .delete(protect, admin, deleteUser);

export default router;
