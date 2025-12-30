// server.js
import dotenv from 'dotenv';
dotenv.config();

// Security middlewares
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
// import xss from 'xss-clean';

import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';
import userRoutes from './routes/userRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import wishlistRoutes from './routes/wishlistRoutes.js';
import { requestLogger } from './middlewares/requestLogger.js';
import logger from './utils/logger.js';
import adminRoutes from './routes/adminRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();

// Middlewares
app.use(express.json());

// -------------------- Security Middlewares -------------------- //

// Helmet → Sets secure HTTP headers
app.use(helmet());

// XSS Cleaning → Prevent injected malicious HTML/JS
// app.use(xss());

// CORS Hardened
app.use(
  cors({
    origin: ['https://eccomerse-full-sa.vercel.app', 'http://localhost:5173'],
    credentials: true,
  })
);

// Rate Limiting → Prevent brute force / DDOS
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 100, // limit each IP to 100 requests per window
  message: 'Too many requests from this IP, please try again later',
});
app.use('/api', limiter);

// Test route
app.get('/', (req, res) => {
  res.send('API is running...');
  console.log('Stripe Key:', process.env.STRIPE_SECRET_KEY);
});

// test Security middlewares
app.get('/api/test-security', (req, res) => {
  res.json({ message: 'Security middlewares working' });
});

// test logger
logger.info('🚀 Logger test: Server starting...');

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/admin', adminRoutes);

// to upload images
app.use('/api/upload', uploadRoutes);

// 404 Not Found
app.use(notFound);
app.use(errorHandler);
app.use(requestLogger); // log every request

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
