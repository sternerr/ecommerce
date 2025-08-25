import { Router } from "express";
import type { Request, Response } from "express";
import { OrderController } from "../controllers/order.controller.ts";
import AuthoMiddleware from "../middleware/authorization.middleware.ts";

const orderRouter: Router = Router();

orderRouter.get("/",
	AuthoMiddleware.authorize,
	AuthoMiddleware.isAdmin,
	OrderController.getOrders
);

orderRouter.get("/users/:id",
	AuthoMiddleware.authorize,
	OrderController.getOrders
);

orderRouter.post("/",
	AuthoMiddleware.authorize,
	OrderController.createOrder
);

orderRouter.get("/:id",
	AuthoMiddleware.authorize,
	OrderController.getOrder
);

export default orderRouter;
