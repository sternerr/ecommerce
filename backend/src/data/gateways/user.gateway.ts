import { pool } from "../pool.ts";
import { v4 as uuidv4 } from "uuid";

export type User = {
	id: string;
	created_at: Date;
	updated_at: Date;
	email: string;
	password: string;
}

export class UserGateway {
	static async findById(user: User): Promise<User> {
		try {
			const res = await pool.query("SELECT * from users WHERE id=$1", [user.id]);
			return res.rows[0];
		} catch (error) {
			throw error;
		}
	}

	static async insert(user: Omit<User, "id" | "created_at" | "updated_at">): Promise<User> {
		try {
			const id = uuidv4();
			const res = await pool.query(`
				INSERT INTO users(id, email, password, created_at, updated_at)
				VALUES($1, $2, $3, NOW(), NOW())
				RETURNING *;`,
				[id, user.email, user.password]
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
