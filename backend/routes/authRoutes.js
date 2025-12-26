// routes/authRoutes.js
import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';

import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// to chekc the protected middleware is working
router.get('/profile', protect, (req, res) => {
  res.json({
    message: 'This is a protected route',
    user: req.user,
  });
});

export default router;
