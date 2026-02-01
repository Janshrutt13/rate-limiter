import express from "express";
import redis from "../config/redis.js";

const router = express.Router();

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
    
    res.json(data);
});

export default router;