import express from "express";
import redis from "../config/redis.js";

const router = express.Router();

router.get("/stats", async (_, res) => {
  const totalRequests = Number(await redis.get("metrics:total")) || 0;
  const rateLimitedRequests = Number(await redis.get("metrics:rate_limited")) || 0;
  const blockedRequests = Number(await redis.get("metrics:blocked")) || 0;
  const allowedRequests = totalRequests - rateLimitedRequests - blockedRequests;
  
  res.json({
    totalRequests,
    allowedRequests,
    rateLimitedRequests,
    blockedRequests
  });
});

router.get("/status", async (_ , res) => {
   res.json({
     total : Number(await redis.get("metrics:total")) || 0,
     blocked : Number(await redis.get("metrics:blocked")) || 0,
     rate_limited : Number(await redis.get("metrics:rate_limited")) || 0
   });
});

router.get("/offenders" , async(_,res) => {
    const keys = await redis.keys("risk:*");
    const data = []

    for(const key of keys){
        const ip = key.split(":")[1];
        const risk = await redis.get(key);
        const blocked = await redis.exists(`blocked:${ip}`)
        data.push({ ip , risk : Number(risk) , blocked : Boolean(blocked)});
    }
    
    data.sort((a, b) => b.risk - a.risk);
    res.json(data.slice(0, 5));
});

router.get("/chart", async (_, res) => {
  const now = Date.now();
  const data = [];
  
  for (let i = 19; i >= 0; i--) {
    const timestamp = Math.floor((now - i * 60000) / 60000) * 60000;
    const count = Number(await redis.get(`chart:requests:${timestamp}`)) || 0;
    data.push({ timestamp, count });
  }
  
  res.json(data);
});

export default router;