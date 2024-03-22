import { Router } from "express";
import * as brandValidation from "./brand.validation.js";
import * as brandController from "./brand.controller.js";
import { validation } from "../../middleware/validation.js";
import { auth } from "../../middleware/auth.js";
import { validRoles } from "../../utils/systemRoles.js";
import { multerCloudinary } from "../../services/multer.js";
import { headers } from "../../utils/generalField.js";

const router = Router();

router.post(
  "/create",
  validation(headers.headers),
  auth(validRoles.Admin),
  multerCloudinary().single("image"),
  validation(brandValidation.createbrand),
  brandController.createbrand
);

router.put(
  "/update/:id",
  validation(headers.headers),
  auth(validRoles.Admin),
  multerCloudinary().single("image"),
  validation(brandValidation.updatebrand),
  brandController.updatebrand
);

export default router;
