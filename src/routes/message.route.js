import { Router } from "express";
import { getMessage, sendMessage } from "../services/message.service.js";
import { protectRoutes } from "../middlewares/protectRoutes.js";

const router = Router();

router.post("/send/:id", protectRoutes, sendMessage);
router.get("/:id", protectRoutes, getMessage);

export default router;
