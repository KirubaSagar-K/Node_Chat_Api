import { Router } from "express";
import authRoutes from "./auth.route.js";
import messageRoutes from "./message.route.js";
import { protectRoutes } from "../middlewares/protectRoutes.js";
import { getUser } from "../services/user.service.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/message", protectRoutes, messageRoutes);
router.get("/users", protectRoutes, getUser);

export default router;
