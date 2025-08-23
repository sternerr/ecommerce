import { Router } from "express";
import fileManager from "../util/filemanager.util.ts";

import type { Request, Response } from "express";
import { createProduct, getProduct, getProducts, updateProduct } from "../controllers/product.controller.ts";
import { authorize, isAdmin } from "../middleware/authorization.middleware.ts";

const productRouter = Router();

productRouter.post("/", authorize, isAdmin, fileManager.upload.single("file"), createProduct);
productRouter.get("/", getProducts);
productRouter.get("/:id", getProduct);
productRouter.put("/", authorize, isAdmin, fileManager.upload.single("file"), updateProduct);

export default productRouter;
