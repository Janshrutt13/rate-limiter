import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { rateLimiter } from "./middleware/rateLimiter.js";
import apiRoutes from "../src/routes/api.routes.js";
import adminRoutes from "../src/routes/admin.routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/admin" , adminRoutes);
app.use(rateLimiter);
app.use("/api" , apiRoutes);

app.listen(process.env.PORT || 4000, () => {
    console.log("Backend running on port" , process.env.PORT)
});