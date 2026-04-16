import { Router } from "express";

import userRoutes from "./user.routes";
import uploadRoutes from "./upload.routes";

import clientRoutes from "./client.routes";

const router = Router();

router.use("/auth", userRoutes);
router.use("/uploads", uploadRoutes);
router.use("/clients", clientRoutes);

export default router;
