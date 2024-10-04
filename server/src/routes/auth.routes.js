import { Router } from "express";
import {
  donorSignup,
  institutionSignup,
  login,
  shopkeeperSignup,
} from "../controller/auth.controller.js";

import {instituteRequest} from "../controller/institution.controller.js";
import {verifyJWT} from "../middleware/auth.middleware.js";

const router = Router();

router.route("/donor-signup").post(donorSignup);
router.route("/shopkeeper-signup").post(shopkeeperSignup);
router.route("/institution-signup").post(institutionSignup);
router.route("/login").post(login);

// router.route("/institute-request").post(verifyJWT,instituteRequest);
router.route("/institute-request").post(instituteRequest);




export default router;
