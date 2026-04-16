import { Router } from "express";

import validateRequest from "../middlewares/validate.middleware";
import { identifier } from "../middlewares/indentifier.middleware";

import { createSurahName, deleteSurahName, getAllSurahNames, getSurahNameByIndex } from "../controllers/surah_name.controller";

import { createSurahNameSchema } from "../schemas/surah_name.schema";

const router = Router();

router.get("/", getAllSurahNames);
router.get("/:index", getSurahNameByIndex);

router.post("/", identifier, validateRequest(createSurahNameSchema), createSurahName);

router.delete("/:id", identifier, deleteSurahName);

export default router;
