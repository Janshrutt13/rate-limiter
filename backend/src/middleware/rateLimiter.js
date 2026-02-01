import redis from "../config/redis.js";
import { increaseRisk, decreaseRisk } from "../services/riskScore.js";

export const rateLimiter = async (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();

  // 1️⃣ Check if IP is blocked
  const isBlocked = await redis.exists(`blocked:${ip}`);
  if (isBlocked) {
    await redis.incr("metrics:blocked");
    return res.status(403).json({ message: "IP is blocked" });
  }

  // 2️⃣ Define windows (convert ENV → number)
  const windows = [
    {
      key: `rate:minute:${ip}`,
      limit: Number(process.env.RATE_LIMIT_MINUTE),
      ttl: 60
    },
    {
      key: `rate:hour:${ip}`,
      limit: Number(process.env.RATE_LIMIT_HOUR),
      ttl: 3600
    }
  ];

  // 3️⃣ Check rate limits
  for (const w of windows) {
    const windowStart = now - w.ttl * 1000;

    await redis.zRemRangeByScore(w.key, 0, windowStart);
    const count = await redis.zCard(w.key);

    if (count >= w.limit) {
      const risk = await increaseRisk(ip, 10);
      await redis.incr("metrics:rate_limited");

      let blockTime = 0;

      if (risk > 70) blockTime = Number(process.env.BLOCK_3);
      else if (risk > 40) blockTime = Number(process.env.BLOCK_2);
      else if (risk > 10) blockTime = Number(process.env.BLOCK_1);

      if (blockTime > 0) {
        await redis.set(`blocked:${ip}`, 1, {
          EX: blockTime
        });
      }

      return res.status(429).json({ message: "Too many requests" });
    }
  }

  // 4️⃣ Record request
  for (const w of windows) {
    await redis.zAdd(w.key, {
      score: now,
      value: now.toString()
    });

    // Set TTL only once (safe)
    await redis.expire(w.key, w.ttl);
  }

  // 5️⃣ Risk decay + metrics
  await decreaseRisk(ip);
  await redis.incr("metrics:total");

  next();
};
