import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.ts";
import { UserGateway, type User } from "../data/gateways/user.gateway.ts";

export default class AuthController {
	static async signUp(req: Request, res: Response, next: any) {
		try {
			const { email, password, isadmin } = req.body;

			const salt: string = await bcrypt.genSalt(10);
			const hashedPassword: string = await bcrypt.hash(password, salt);

			const user: User = await UserGateway.insert({ email: email, password: hashedPassword, isadmin });

			const token: string = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions);

			res.status(201).json({
				ok: true,
				message: "User created successfully",
				data: {
					token,
					user: {
						id: user.id,
					}
				}
			});
		} catch (error) {
			next(error)
		}
	}

	static async signIn(req: Request, res: Response, next: any) {
		try {
			const { email, password } = req.body;

			const user: User = await UserGateway.findByEmail(email);

			const isPasswordValid = await bcrypt.compare(password, user.password);
			if (!isPasswordValid) {
				const error = new Error("Invalid password");
				throw error;
			}

			const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions);

			res.status(200).json({
				success: true,
				message: "User signed in successfully",
				data: {
					token,
					user: {
						id: user.id,
					}
				}
			});
		} catch (error) {
			next(error)
		}
	}
}
