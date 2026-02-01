import express from "express";

const router = express.Router();

router.get("/test" , (req,res) => {
    res.json({ message : "Request allowed"})
});

export default router;