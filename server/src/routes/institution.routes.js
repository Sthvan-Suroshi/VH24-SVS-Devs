import { Router } from "express";
import { createDonationRequest } from "../controller/institution.controller.js";
import { isInstitution } from "../middleware/auth.middleware.js";
const router = Router();

router.route("/institute-request").post(isInstitution, createDonationRequest);

export default router;
