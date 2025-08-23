import type { Request, Response } from "express";
import { OrderGateway, OrderItemsGateway, } from "../data/gateways/order.gateway.ts";
import type { Order, OrderItem } from "../data/gateways/order.gateway.ts";
import { ProductGateway, type Product } from "../data/gateways/product.gateway.ts";

export class OrderController {
	static async createOrder(req: Request, res: Response, next: any) {
		try {
			const { userId, items } = req.body;
			if (!items || items.length <= 0) {
				throw new Error("Invalid order data");
			}

			const productsPromises = items.map(async (item: any) => {
				const product = await ProductGateway.findById(item.productId)
				return { product, quantity: item.quantity }
			});

			const products = await Promise.all(productsPromises);

			const totalPrice: number = products.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
			const order: Order = await OrderGateway.insert({ user_id: userId, totalprice: totalPrice })

			for (let i = 0; i < products.length; i++) {
				await OrderItemsGateway.insert({ orderid: order.id, productid: products[i].product.id, quantity: products[i].quantity });
				await ProductGateway.update({
					id: products[i].product.id,
					name: products[i].product.name,
					description: products[i].product.description,
					imgpath: products[i].product.imgpath,
					stock: (products[i].product.stock - products[i].quantity),
					price: products[i].product.price
				});
			}

			res.json({
				ok: true,
				message: "order created successfully"
			});
		} catch (error) {
			next(error)
		}
	}

	static async getOrders(req: Request, res: Response, next: any) {
		try {
			const { id } = req.params;
			const orders: Order[] = await OrderGateway.findAll();

			let ordersWithItems = await Promise.all(
				orders.map(async (order: Order) => {
					const items = await OrderItemsGateway.findAllByOrderId(order.id);
					return { ...order, orderItems: items };
				})
			);

			if (req.user && req.user.isadmin) {
				res.status(200).json({
					ok: true,
					message: "Retrived orders successfully",
					data: {
						ordersWithItems
					}
				});
			} else if (id && req.user && id === req.user.id) {
				ordersWithItems = ordersWithItems.filter((order) => order.user_id === id)
			} else {
				res.status(401).json({
					ok: true,
					message: "Unauthorized",
				});
			}

			res.status(200).json({
				ok: true,
				message: "Retrived orders successfully",
				data: {
					ordersWithItems
				}
			});
		} catch (error) {
			next(error)
		}
	}

	static async getOrder(req: Request, res: Response, next: any) {
		try {
			const { id } = req.params;
			if (!id) {
				throw new Error("Can not retreive an order without an order id");
			}

			const order: Order = await OrderGateway.findById(id);
			const items = await OrderItemsGateway.findAllByOrderId(order.id);
			const orderWithItems = { ...order, orderItems: items };

			if (req.user && req.user.isadmin) {
				res.status(200).json({
					ok: true,
					message: "Retrived order by id successfully",
					data: {
						orderWithItems
					}
				});
			} else if (req.user && req.user.id === order.user_id) {
				res.status(200).json({
					ok: true,
					message: "Retrived order by id successfully",
					data: {
						orderWithItems
					}
				});
			}
		} catch (error) {
			next(error)
		}
	}
}

export default new OrderController();
