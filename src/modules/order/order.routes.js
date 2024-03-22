import { Router } from "express";
import * as OrderValidtion from "./order.validation.js";
import * as OrderController from "./order.controller.js";
import { validation } from "../../middleware/validation.js";
import { auth } from "../../middleware/auth.js";
import { validRoles } from "../../utils/systemRoles.js";
import express from 'express';

const router = Router();

router.post(
  "/create",
  auth([...validRoles.User, ...validRoles.Admin]),
  validation(OrderValidtion.createOrder),
  OrderController.createOrder
);

router.patch("/:orderId",
  validation(OrderValidtion.cancelOrder),
  auth([...validRoles.User, ...validRoles.Admin]),
  OrderController.cancelOrder)

 



router.post('/webhook', express.raw({type: 'application/json'}), OrderController.webhook);







export default router;
