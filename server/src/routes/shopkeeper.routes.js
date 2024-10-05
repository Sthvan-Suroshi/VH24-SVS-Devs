import { Router } from "express";
import { shopkeeperDonation } from "../controller/shopkeeper.controller.js";
// import { isShopkeeper } from "../middleware/auth.middleware.js";

const router = Router();

router.route("/shopkeeper-donate").post(shopkeeperDonation);

export default router;
