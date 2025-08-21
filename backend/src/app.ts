import express from "express";
import productRouter from "./routes/product.route.ts";

import type { Express, Request, Response } from "express";

class App {
	private express: Express;

	constructor() {
		this.express = express();
		this.middlewares();
		this.routes();
	}

	private middlewares(): void {
		this.express.use(express.json());
		this.express.use(express.urlencoded({ extended: true }));
	}

	private routes(): void {
		this.express.use("/api/v1/products", productRouter);

		this.express.get("/", (req: Request, res: Response) => {
			res.json({ message: "Welcome to ecommerce backend" });
		});
	}

	public listen(port: number): void {
		this.express.listen(port, () => {
			console.log(`Ecommerce backend @ http://localhost:${port}`);
		})
	}
}

export default new App();
