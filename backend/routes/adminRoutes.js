import express from 'express';
import { getAdminStats } from '../controllers/adminController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { admin } from '../middlewares/adminMiddleware.js';

const router = express.Router();

router.get('/stats', protect, admin, getAdminStats);

export default router;
