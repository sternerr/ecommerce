import { Router } from "express";
import fileManager from "../util/filemanager.util.ts";

import type { Request, Response } from "express";
import ProductController from "../controllers/product.controller.ts";
import AuthorizationMiddleware from "../middleware/authorization.middleware.ts";

const productRouter = Router();

productRouter.post("/",
	AuthorizationMiddleware.authorize,
	AuthorizationMiddleware.isAdmin,
	fileManager.upload.single("file"),
	ProductController.createProduct
);

productRouter.get("/", ProductController.getProducts);
productRouter.get("/:id", ProductController.getProduct);
productRouter.put("/",
	AuthorizationMiddleware.authorize,
	AuthorizationMiddleware.isAdmin,
	fileManager.upload.single("file"),
	ProductController.updateProduct
);

export default productRouter;
