import { pool } from "../pool.ts";
import { v4 as uuidv4 } from "uuid";

export type User = {
	id: string;
	created_at: Date;
	updated_at: Date;
	email: string;
	password: string;
	isadmin: boolean;
}

export class UserGateway {
	static async findById(id: string): Promise<User> {
		try {
			const res = await pool.query("SELECT * from users WHERE id=$1", [id]);
			return res.rows[0];
		} catch (error) {
			throw error;
		}
	}

	static async findByEmail(email: string): Promise<User> {
		try {
			const res = await pool.query("SELECT * from users WHERE email=$1", [email]);
			return res.rows[0];
		} catch (error) {
			throw error;
		}
	}

	static async insert(user: Omit<User, "id" | "created_at" | "updated_at">): Promise<User> {
		try {
			const id = uuidv4();
			const res = await pool.query(`
				INSERT INTO users(id, email, password, isadmin, created_at, updated_at)
				VALUES($1, $2, $3, $4, NOW(), NOW())
				RETURNING *`,
				[id, user.email, user.password, user.isadmin]
			)

			return res.rows[0];
		} catch (error) {
			throw error;
		}
	}

	static async delete(user: User): Promise<string> {
		if (!user.id) {
			throw new Error("Cannot delete user without ID");
		}

		try {
			const res = await pool.query(`DELETE FROM users WHERE id=$1 RETURNING id`, [user.id]);
			if (res.rowCount === 0) {
				throw new Error("User not found, cannot delete");
			}

			return res.rows[0].id;
		} catch (error) {
			throw error;
		}
	}
}
