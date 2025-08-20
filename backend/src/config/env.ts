import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

function getEnv(key: string, required = true): string {
	const value = process.env[key];
	if (!value && required) {
		throw new Error(`Missing environemnt variable: ${key}`);
	}

	return value as string
}

export const PORT: number = parseInt(getEnv("PORT", false));
export const DB_URI: string = getEnv("DB_URI", true);
