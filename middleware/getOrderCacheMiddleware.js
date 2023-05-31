const Cache = require('../config/redis');


const GetOrderCacheMiddleware = async (req, res, next) => {
  const { orderId } = req.params;

  const cacheKey = `orders:${orderId}`;

  const cachedOrder = await Cache.redis.get(cacheKey);

  if (cachedOrder) {
      // Cache hit
      return res.json({ status: true, order: JSON.parse(cachedOrder) })
  }

  // Cache miss
  next();
}

module.exports = GetOrderCacheMiddleware;