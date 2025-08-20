import { pool } from "../pool.ts";
import { v4 as uuidv4 } from "uuid";

export class UserGateway {
	public id: string | undefined;
	public created_at: Date | undefined;
	public updated_at: Date | undefined;
	public email: string;
	public password: string;

	constructor(data: { id?: string; created_at?: Date; updated_at?: Date; email: string; password: string }) {
		this.id = data.id;
		this.created_at = data.created_at;
		this.updated_at = data.updated_at;
		this.email = data.email;
		this.password = data.password;
	}

	static async findById(userId: string): Promise<UserGateway | undefined> {
		const res = await pool.query("SELECT * from users WHERE id=$1", [userId]);
		if (res.rowCount === 0) {
			return undefined;
		}

		const { id, created_at, updated_at, email, password } = res.rows[0];
		return new UserGateway({ id, created_at, updated_at, email, password });
	}

	async insert(): Promise<void> {
		if (!this.id) {
			this.id = uuidv4();
		}

		const { rows } = await pool.query(`
		INSERT INTO users(id, email, password, created_at, updated_at)
		VALUES($1, $2, $3, NOW(), NOW())
		RETURNING created_at, updated_at;`, [this.id, this.email, this.password]
		)

		this.created_at = rows[0].created_at
		this.updated_at = rows[0].updated_at
	}

	async update(): Promise<void> {
		if (!this.id) {
			throw new Error("Cannot update user without ID");
		}

		const { rows } = await pool.query(`
		UPDATE users 
		SET email = $1, password = $2, updated_at = NOW()
		WHERE id = $3
		RETURNING updated_at`,
			[this.email, this.password, this.id]
		);
		this.updated_at = rows[0].updated_at;
	}

	async delete(): Promise<void> {
		if (!this.id) {
			throw new Error("Cannot delete user without ID");
		}

		const res = await pool.query(`DELETE FROM users WHERE id=$1 RETURNING id`, [this.id]);
		if (res.rowCount === 0) {
			throw new Error("User not found, cannot delete");
		}

		Object.assign(this, {});
	}
}
