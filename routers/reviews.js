import express from "express";
import { index } from "../controllers/reviews.js";

const router = express.Router();

router.get("/", index);

export default router;