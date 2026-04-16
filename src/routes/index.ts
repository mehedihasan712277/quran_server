import { Router } from "express";

import userRoutes from "./user.routes";
import uploadRoutes from "./upload.routes";
import clientRoutes from "./client.routes";
import surahRoutes from "./surah.routes";
import translationRoutes from "./translation.routes";
import surahNameRoutes from "./surah_name.routes";

const router = Router();

router.use("/auth", userRoutes);
router.use("/uploads", uploadRoutes);
router.use("/clients", clientRoutes);
router.use("/surahs", surahRoutes);
router.use("/translations", translationRoutes);
router.use("/surahnames", surahNameRoutes);

export default router;
