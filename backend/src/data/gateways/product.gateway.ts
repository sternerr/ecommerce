import { pool } from "../pool.ts";
import { v4 as uuidv4 } from "uuid";

export class ProductGateway {
	public id: string | undefined;
	public created_at: Date | undefined;
	public updated_at: Date | undefined;
	public name: string;
	public price: number;
	public stock: number;

	constructor(data: {
		id?: string,
		created_at?: Date,
		updated_at?: Date,
		name: string,
		price: number,
		stock: number
	}) {
		this.id = data.id;
		this.created_at = data.created_at;
		this.updated_at = data.updated_at;
		this.name = data.name;
		this.price = data.price;
		this.stock = data.stock;
	}

	static async findById(productId: string): Promise<ProductGateway | undefined> {
		const res = await pool.query("SELECT * from products WHERE id=$1", [productId]);
		if (res.rowCount === 0) {
			return undefined;
		}

		const { id, created_at, updated_at, name, price, stock } = res.rows[0];
		return new ProductGateway({ id, created_at, updated_at, name, price, stock });
	}

	async insert(): Promise<void> {
		if (!this.id) {
			this.id = uuidv4();
		}

		const { rows } = await pool.query(`
		INSERT INTO products(id, name, price, stock, created_at, updated_at)
		VALUES($1, $2, $3, $4, NOW(), NOW())
		RETURNING created_at, updated_at;`, [this.id, this.name, this.price, this.stock]
		)

		this.created_at = rows[0].created_at
		this.updated_at = rows[0].updated_at
	}

	async update(): Promise<void> {
		if (!this.id) {
			throw new Error("Cannot update user without ID");
		}

		const { rows } = await pool.query(`
		UPDATE products
		SET name = $1, price = $2, stock = $3, updated_at = NOW()
		WHERE id = $4
		RETURNING updated_at`, [this.name, this.price, this.stock, this.id]
		);

		this.updated_at = rows[0].updated_at;
	}

	async delete(): Promise<void> {
		if (!this.id) {
			throw new Error("Cannot delete user without ID");
		}

		const res = await pool.query(`DELETE FROM products WHERE id=$1 RETURNING id`, [this.id]);
		if (res.rowCount === 0) {
			throw new Error("User not found, cannot delete");
		}

		Object.assign(this, {});
	}
}
