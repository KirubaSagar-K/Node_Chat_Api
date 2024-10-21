import { Router } from "express";
import { logIn, logOut, signUp } from "../services/auth.service.js";

const router = Router();

router.post("/signup", signUp);
router.post("/signin", logIn);
router.post("/logout", logOut);

export default router;
