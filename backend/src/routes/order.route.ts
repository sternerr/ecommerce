import { Router } from "express";
import type { Request, Response } from "express";
import { signIn, signUp } from "../controllers/auth.controller.ts";
import { OrderController } from "../controllers/order.controller.ts";
import { authorize, isAdmin } from "../middleware/authorization.middleware.ts";

const orderRouter: Router = Router();

orderRouter.get("/", authorize, isAdmin, OrderController.getOrders);
orderRouter.get("/users/:id", authorize, OrderController.getOrders);
orderRouter.post("/", authorize, OrderController.createOrder);
orderRouter.get("/:id", authorize, OrderController.getOrder);

export default orderRouter;
