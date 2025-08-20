import express from "express";
import type { Express, Request, Response } from "express";

import { PORT } from "./config/env.ts";

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
	res.json({ message: "Welcome to ecommerce backend" });
});

app.listen(PORT || 3000, () => {
	console.log(`Ecommerce backend @ http://localhost:${PORT || 3000}`);
})
