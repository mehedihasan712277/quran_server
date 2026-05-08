import { Router } from "express";

import userRoutes from "./user.routes";
import uploadRoutes from "./upload.routes";
import surahRoutes from "./surah.routes";
import translationRoutes from "./translation.routes";
import surahNameRoutes from "./surah_name.routes";
import audioRoutes from "./audio.routes";

const router = Router();

router.use("/auth", userRoutes);
router.use("/uploads", uploadRoutes);
router.use("/surahs", surahRoutes);
router.use("/translations", translationRoutes);
router.use("/surahnames", surahNameRoutes);
router.use("/audios", audioRoutes);

export default router;
