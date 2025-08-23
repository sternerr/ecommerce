import type { Request } from 'express';
import type { User } from "../data/gateways/user.gateway.ts";

declare global {
	namespace Express {
		interface Request {
			user?: User;
		}
	}
}
