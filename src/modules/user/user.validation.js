import joi from "joi"
import { generalFiled } from "../../utils/generalField.js";


export const tokenSchema = joi.object({
    authorization:joi.string().required()
}).required()
 
export const userUdateSchema = joi.object({
    email:generalFiled.email,
}).required()
export const userEmailSchema = joi.object({
    email:generalFiled.email
}).required()

export const passwordSchema = joi.object({
    oldPassword:generalFiled.password.required(),
    newPassword:generalFiled.password.required()
}).required()
