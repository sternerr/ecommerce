import fileManger from "../util/filemanager.util.ts";
import type { Request, Response } from "express";
import { ProductGateway, type Product } from "../data/gateways/product.gateway.ts";

export async function createProduct(req: Request, res: Response, next: any) {
	try {
		const { name, description, price, stock } = req.body;

		if (!req.file) {
			throw new Error("No image exists");
		}

		const product: Product = await ProductGateway.insert({ name, description, price, stock, imgpath: req.file.filename });
		res.status(201).json({
			ok: true,
			message: "Product created successfully",
			data: product,
		});

	} catch (error) {
		next(error)
	}
}

export async function getProducts(req: Request, res: Response, next: any) {
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

export async function getProduct(req: Request, res: Response, next: any) {
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

export async function updateProduct(req: Request, res: Response, next: any) {
	try {
		if (!req.file) {
			throw new Error("No image exists");
		}

		const { id, name, description, price, stock } = req.body;
		const product: Product = await ProductGateway.update({
			id,
			name,
			description,
			price,
			stock,
			imgpath: req.file.filename
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

export async function deleteProduct(req: Request, res: Response, next: any) {
	try {
		const { id } = req.params;
		const product: Product = await ProductGateway.delete(id as string);

		fileManger.deleteFile(product.imgpath);

		res.status(200).json({
			success: true,
			message: "product deleted successfully",
			data: {
				product: product
			}
		});
	} catch (error) {
		next(error)
	}
}
