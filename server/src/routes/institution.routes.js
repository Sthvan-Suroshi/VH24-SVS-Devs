import { Router } from "express";
import {
  createDonationRequest,
  getInstitutionsRequestingDonations,
} from "../controller/institution.controller.js";
import { isInstitution } from "../middleware/auth.middleware.js";
const router = Router();

router.route("/institute-request").post(isInstitution, createDonationRequest);
router.route("/get-institution").get(getInstitutionsRequestingDonations);

export default router;
