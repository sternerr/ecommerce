import { Pool } from "pg";
import { DB_URI } from "../config/env.ts";

export const pool: Pool = new Pool({
	connectionString: DB_URI,
	max: 10
});

