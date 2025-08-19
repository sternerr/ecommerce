import express from "express";
import type { Express, Request, Response } from "express";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
	res.json({ message: "Welcome to ecommerce backend" });
});

app.listen(3000, () => {
	console.log(`Ecommerce backend @ http://localhost:3000`);
})
