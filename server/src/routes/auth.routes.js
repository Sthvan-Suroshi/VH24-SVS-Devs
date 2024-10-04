import { Router } from "express";
import {
  donorSignup,
  institutionSignup,
  login,
  shopkeeperSignup,
} from "../controller/auth.controller.js";

const router = Router();

router.route("/donor-signup").post(donorSignup);
router.route("/shopkeeper-signup").post(shopkeeperSignup);
router.route("/institution-signup").post(institutionSignup);
router.route("/login").post(login);

export default router;
