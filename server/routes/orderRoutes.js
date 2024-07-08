import express from "express";
import { createOrder, getUserOrders } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", createOrder);
router.get("/", getUserOrders);

export default router;
