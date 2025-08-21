import { pool } from "../pool.ts";
import { v4 as uuidv4 } from "uuid";

export type Product = {
	id: string;
	created_at: Date;
	updated_at: Date;
	name: string;
	description: string;
	imgpath: string;
	price: number;
	stock: number;
}

export class ProductGateway {
	static async findAll(): Promise<Product[]> {
		try {
			const res = await pool.query("SELECT * FROM products");
			return res.rows;
		} catch (error) {
			throw error;
		}
	}

	static async findById(product: Product): Promise<Product> {
		if (!product.id) {
			throw new Error("Can't retrieve product without id");
		}

		try {
			const res = await pool.query("SELECT * from products WHERE id=$1", [product.id]);
			return res.rows[0];
		} catch (error) {
			throw error;
		}
	}

	static async insert(product: Omit<Product, "id" | "created_at" | "updated_at">): Promise<Product> {
		try {
			const id = uuidv4();
			const res = await pool.query(
				`INSERT INTO products(id, name, description, imgpath, price, stock, created_at, updated_at)
				VALUES($1, $2, $3, $4, $5, $6, NOW(), NOW())
				RETURNING *;`,
				[id, product.name, product.description, product.imgpath, product.price, product.stock]
			)

			return res.rows[0];
		} catch (error) {
			throw error;
		}
	}

	static async delete(product: Product): Promise<string> {
		if (!product.id) {
			throw new Error("Cannot delete product without ID");
		}

		try {
			const res = await pool.query(`DELETE FROM products WHERE id=$1 RETURNING id`, [product.id]);
			return res.rows[0].id;
		} catch (error) {
			throw error;
		}
	}
}
