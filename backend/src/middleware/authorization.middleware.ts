import type { Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.ts";
import { UserGateway, type User } from "../data/gateways/user.gateway.ts";

export async function authorize(req: Request, res: Response, next: any) {
	try {
		let token;
		if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
			token = req.headers.authorization.split(" ")[1];
		}

		if (!token) {
			res.status(401).json({
				ok: false,
				message: "Unauthorized",
			});
		}

		const decoded: string | JwtPayload = jwt.verify(token as string, JWT_SECRET);
		if (typeof decoded === 'string') {
			throw new Error('Invalid token payload');
		}

		const user: User = await UserGateway.findById(decoded.userId);
		if (!user) {
			res.status(401).json({
				ok: false,
				message: "Unauthorized",
			});
		}

		req.user = user;

		next()
	} catch (error: any) {
		res.status(401).json({
			ok: false,
			message: "Unauthorized",
			error: error.message
		});
	}
}


export async function isAdmin(req: Request, res: Response, next: any) {
	if (req.user && req.user.isadmin) {
		next()
		return
	}

	res.status(401).json({
		ok: false,
		message: "Unauthorized",
	});
}
