import { Router } from "express";

import validateRequest from "../middlewares/validate.middleware";
import { identifier } from "../middlewares/indentifier.middleware";

import { createTranslation, deleteTranslation, getAllTranslations, getTranslationByIndex } from "../controllers/translation.controller";
import { createTranslationSchema } from "../schemas/translation.schema";

const router = Router();

router.get("/", getAllTranslations);
router.get("/:index", getTranslationByIndex);

router.post("/", identifier, validateRequest(createTranslationSchema), createTranslation);

router.delete("/:id", identifier, deleteTranslation);

export default router;
