import { Router } from "express";
import type { Request, Response } from "express";

const productRouter = Router();

productRouter.post("/", (req: Request, res: Response) => res.send("ok"));
productRouter.get("/", (req: Request, res: Response) => res.send("ok"));
productRouter.get("/:id", (req: Request, res: Response) => res.send("ok"));
productRouter.put("/", (req: Request, res: Response) => res.send("ok"));
productRouter.delete("/:id", (req: Request, res: Response) => res.send("ok"));

export default productRouter;
