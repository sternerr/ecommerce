import { Router } from "express";
import fileManager from "../util/filemanager.util.ts";

import type { Request, Response } from "express";
import { createProduct, deleteProduct, getProduct, getProducts } from "../controllers/product.controller.ts";

const productRouter = Router();

productRouter.post("/", fileManager.upload.single("file"), createProduct);
productRouter.get("/", getProducts);
productRouter.get("/:id", getProduct);
productRouter.put("/", (req: Request, res: Response) => res.send("ok"));
productRouter.delete("/:id", deleteProduct);

export default productRouter;
