import { Router } from "express"
import * as AuthValidation from "./auth.validation.js";
import * as AuthController from "./auth.controller.js";
import { validation } from './../../middleware/validation.js';

const router = Router()



router.post("/signUp", validation(AuthValidation.signUp), AuthController.signUp)
router.get("/confirmEmail/:token", validation(AuthValidation.confirmEmail), AuthController.confirmEmail)
router.get("/refreshToken/:token", validation(AuthValidation.confirmEmail), AuthController.refreshToken)
router.patch("/sendCode", validation(AuthValidation.forgetPassword), AuthController.forgetPassword)
router.patch("/resetPassword", validation(AuthValidation.resetPassword), AuthController.resetPassword)
router.post("/signIn", validation(AuthValidation.signIn), AuthController.signIn)




export default router