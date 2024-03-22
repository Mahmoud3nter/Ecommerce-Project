import { Router } from "express";
import * as CouponValidtion from "./coupon.validation.js";
import * as CouponController from "./coupon.controller.js";
import { validation } from "../../middleware/validation.js";
import { auth } from "../../middleware/auth.js";
import { validRoles } from "../../utils/systemRoles.js";

const router = Router();

router.post(
  "/create",
  auth(validRoles.Admin),
  validation(CouponValidtion.createCoupon),
  CouponController.createCoupon
);

router.put(
  "/update/:id",
  auth(validRoles.Admin),
  validation(CouponValidtion.updateCoupon),
  CouponController.updateCoupon
);

export default router;
