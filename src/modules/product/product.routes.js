import { Router } from "express";
import * as ProductValidation from "./product.validation.js";
import * as ProductController from "./product.controller.js";
import { validation } from "../../middleware/validation.js";
import { auth } from "../../middleware/auth.js";
import { validRoles } from "../../utils/systemRoles.js";
import { multerCloudinary } from "../../services/multer.js";
import { headers } from "../../utils/generalField.js";
import reviewRouter from "../../modules/review/review.routes.js"
const router = Router();


router.use("/:productId/reviews", reviewRouter)

router.post(
  "/create",
  validation(headers.headers),
  auth([...validRoles.Admin, ...validRoles.User]),
  multerCloudinary().array("images"),
  validation(ProductValidation.createProduct),
  ProductController.createProduct
);

router.put(
  "/update/:productId",
  validation(headers.headers),
  auth([...validRoles.Admin, ...validRoles.User]),
  multerCloudinary().array("images"),
  validation(ProductValidation.updateProduct),
  ProductController.updateProduct
);


router.get(
  "/",
  ProductController.getProducts
);


router.patch(
  "/:productId/wishList",
  auth([...validRoles.Admin, ...validRoles.User]),
  ProductController.addToWishList
);
router.patch(
  "/:productId/wishList/remove",
  auth([...validRoles.Admin, ...validRoles.User]),
  ProductController.removeFromWishList
);



export default router;
