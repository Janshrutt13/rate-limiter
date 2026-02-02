import {createClient} from "redis";
import mockRedis from "./mockRedis.js";

let redis;

try {
  redis = createClient({
    socket: {
      host: "127.0.0.1",
      port: 6379
    }
  });
  
  redis.on("error", err => {
    console.log("Redis not available, using mock Redis for development");
  });
  
  await redis.connect();
} catch (error) {
  console.log("Redis not available, using mock Redis for development");
  redis = mockRedis;
  await redis.connect();
}

export default redis;

