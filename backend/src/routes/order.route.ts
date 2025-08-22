import { Router } from "express";
import type { Request, Response } from "express";
import { signIn, signUp } from "../controllers/auth.controller.ts";
import { OrderController } from "../controllers/order.controller.ts";

const orderRouter: Router = Router();

orderRouter.get("/", OrderController.getOrders);
orderRouter.get("/users/:id", OrderController.getOrders);
orderRouter.post("/", OrderController.createOrder);
orderRouter.get("/:id", OrderController.getOrder);

export default orderRouter;
