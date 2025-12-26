import logger from '../utils/logger.js';

export const requestLogger = (req, res, next) => {
  logger.info({
    method: req.method,
    url: req.originalUrl,
    user: req.user ? req.user._id : 'guest',
  });
  next();
};
