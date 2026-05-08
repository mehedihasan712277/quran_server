import { Router } from "express";

import validateRequest from "../middlewares/validate.middleware";
import { identifier } from "../middlewares/indentifier.middleware";

import { createAudio, deleteAudio, getAllAudios, getSingleAudio, updateAudio } from "../controllers/audio.controller";

import { createAudioSchema, updateAudioSchema } from "../schemas/audio.schema";

const router = Router();

router.get("/", getAllAudios);
router.get("/:index", getSingleAudio);

router.post("/", identifier, validateRequest(createAudioSchema), createAudio);

router.patch("/:id", identifier, validateRequest(updateAudioSchema), updateAudio);

router.delete("/:id", identifier, deleteAudio);

export default router;
