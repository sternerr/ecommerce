import { pool } from "../pool.ts";
import { v4 as uuidv4 } from "uuid";

export type Order = {
	id: string;
	created_at: Date;
	updated_at: Date;
	totalprice: number;
	user_id: string;
}

export type OrderItem = {
	productid: string;
	orderid: string;
	quantity: number;
}

export class OrderItemsGateway {
	static async findAllByOrderId(id: string): Promise<OrderItem[]> {
		try {
			const res = await pool.query("SELECT * from order_items WHERE orderid=$1", [id]);
			return res.rows;
		} catch (error) {
			throw new Error("Failed to retrieve orders items");
		}
	}

	static async insert(orderItem: OrderItem): Promise<OrderItem> {
		try {
			const res = await pool.query(
				`INSERT INTO order_items(productId, orderId, quantity)
				VALUES($1, $2, $3)
				RETURNING *`,
				[orderItem.productid, orderItem.orderid, orderItem.quantity]
			)

			return res.rows[0];
		} catch (error) {
			console.error(error);
			throw new Error("Failed to insert order");
		}
	}
}

export class OrderGateway {
	static async findById(id: string): Promise<Order> {
		try {
			const res = await pool.query("SELECT * from orders WHERE id=$1", [id]);
			return res.rows[0];
		} catch (error) {
			throw new Error("Failed to retrieve order by id");
		}
	}

	static async findAll(): Promise<Order[]> {
		try {
			const res = await pool.query("SELECT * from orders");
			return res.rows;
		} catch (error) {
			throw new Error("Failed to retrieve orders");
		}
	}

	static async findAllByUserId(uid: string): Promise<Order[]> {
		try {
			const res = await pool.query("SELECT * from orders WHERE id=$1", [uid]);
			return res.rows;
		} catch (error) {
			throw new Error("Failed to retrieve orders for user");
		}
	}

	static async insert(order: Omit<Order, "id" | "created_at" | "updated_at">): Promise<Order> {
		try {
			const id = uuidv4();
			const res = await pool.query(
				`INSERT INTO orders(id, totalprice, user_id, created_at, updated_at)
				VALUES($1, $2, $3, NOW(), NOW())
				RETURNING *`,
				[id, order.totalprice, order.user_id]
			)

			return res.rows[0];
		} catch (error) {
			console.error(error);
			throw new Error("Failed to insert order");
		}
	}

	static async delete(order: Order): Promise<string> {
		if (!order.id) {
			throw new Error("Cannot delete an order without ID");
		}

		try {
			const res = await pool.query(`DELETE FROM orders WHERE id=$1 RETURNING id`, [order.id]);
			return res.rows[0].id;
		} catch (error) {
			throw error;
		}
	}
}
