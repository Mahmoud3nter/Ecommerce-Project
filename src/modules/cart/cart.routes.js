import { Router } from "express";
import * as CartValidation from "./cart.validation.js";
import * as CartController from "./cart.controller.js";
import { validation } from "../../middleware/validation.js";
import { auth } from "../../middleware/auth.js";
import { validRoles } from "../../utils/systemRoles.js";
import { headers } from "../../utils/generalField.js";

const router = Router();

router.post(
  "/create",
  auth(validRoles.Admin),
  validation(CartValidation.createcart),
  CartController.createCart
);

router.put(
  "/remove",
  auth(validRoles.Admin),
  CartController.removeCart
);
router.put(
  "/clear",
  auth(validRoles.Admin),
  validation(CartValidation.clearCart),
  CartController.clearCart
);



export default router;
