import { Router } from "express";

import validateRequest from "../middlewares/validate.middleware";

import { identifier } from "../middlewares/indentifier.middleware";
import { createClient, deleteClient, getAllClients, updateClient } from "../controllers/client.controller";
import { createClientSchema, updateClientSchema } from "../schemas/client.schema";

const router = Router();

router.get("/", getAllClients);
router.post("/", identifier, validateRequest(createClientSchema), createClient);
router.put("/:id", identifier, validateRequest(updateClientSchema), updateClient);
router.delete("/:id", identifier, deleteClient);

export default router;
