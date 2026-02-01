import redis from "../config/redis.js"

export async function increaseRisk (ip,value){
    const key = `risk:${ip}`;
    const risk = await redis.incrBy(key , value)
    await redis.expire(key, 3600); // Expire in 1 hour
    return risk;
}

export async function decreaseRisk(ip) {
   const key = `risk:${ip}`;
   const risk = await redis.decrBy(key , 1)
   if(risk < 0) await redis.set(key , 0)
   return Math.max(risk,0);
}

export async function getRisk(ip){
    return Number(await redis.get(`risk:${ip}`) || 0);
}