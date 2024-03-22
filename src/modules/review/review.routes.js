import { Router } from "express";
import * as ReviewValidation from "./review.validation.js";
import * as ReviewController from "./review.controller.js";
import { validation } from "../../middleware/validation.js";
import { auth } from "../../middleware/auth.js";
import { validRoles } from "../../utils/systemRoles.js";
import { headers } from "../../utils/generalField.js";

const router = Router({ mergeParams: true });


router.post("/",
    validation(ReviewValidation.addReview),
    auth([...validRoles.User, ...validRoles.Admin]),
    ReviewController.addReview
)

router.delete("/:id",
    auth([...validRoles.User, ...validRoles.Admin]),
    ReviewController.removeReview
)

export default router;
