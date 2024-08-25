// src/middlewares/rateLimiter.js
const { RateLimiterRedis } = require('rate-limiter-flexible');
const redis = require('../config/redisConfig');

const rateLimiter = new RateLimiterRedis({
  storeClient: redis,
  points: 20, // 20 tasks
  duration: 60, // per 1 minute by IP
  blockDuration: 60, // block for 1 minute if consumed more than points
});

const rateLimitMiddleware = (req, res, next) => {
  const userId = req.body.user_id;

  rateLimiter.consume(userId, 1)
    .then(() => next())
    .catch(() => res.status(429).json({ message: 'Too Many Requests' }));
};

module.exports = rateLimitMiddleware;
