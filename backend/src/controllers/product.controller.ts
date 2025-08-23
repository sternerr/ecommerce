import type { Request, Response } from "express";
import { ProductGateway, type Product } from "../data/gateways/product.gateway.ts";

export default class ProductController {
	static async createProduct(req: Request, res: Response, next: any) {
		try {
			const { name, description, price, stock, isvisible } = req.body;

			if (!req.file) {
				throw new Error("No image exists");
			}

			const product: Product = await ProductGateway.insert({
				name,
				description,
				price,
				stock,
				imgpath: req.file.filename,
				isvisible
			});

			res.status(201).json({
				ok: true,
				message: "Product created successfully",
				data: product,
			});

		} catch (error) {
			next(error)
		}
	}

	static async getProducts(req: Request, res: Response, next: any) {
		try {
			const products: Product[] = await ProductGateway.findAll();

			res.status(200).json({
				success: true,
				message: "Retrived products successfully",
				data: {
					products: products
				}
			});
		} catch (error) {
			next(error)
		}
	}

	static async getProduct(req: Request, res: Response, next: any) {
		try {
			const { id } = req.params;
			const product: Product = await ProductGateway.findById(id as string);

			res.status(200).json({
				success: true,
				message: "Retrived product successfully",
				data: {
					product,
				}
			});
		} catch (error) {
			next(error)
		}
	}

	static async updateProduct(req: Request, res: Response, next: any) {
		try {
			if (!req.file) {
				throw new Error("No image exists");
			}

			const { id, name, description, price, stock, isvisible } = req.body;
			const product: Product = await ProductGateway.update({
				id,
				name,
				description,
				price,
				stock,
				imgpath: req.file.filename,
				isvisible
			});

			res.status(200).json({
				success: true,
				message: "Retrived product successfully",
				data: {
					product,
				}
			});
		} catch (error) {
			next(error)
		}
	}
}
