// middlewares/errorMiddleware.js
import logger from '../utils/logger.js';

// Catch errors and format response
export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  logger.error({
    message: err.message,
    stack: err.stack,
    route: req.originalUrl,
  });
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    // Show stack trace only in development
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};
