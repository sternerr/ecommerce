import { expect, test } from "vitest";
import { ProductGateway, type Product } from "../data/gateways/product.gateway.ts";

test("[Data Layer]: ProductGateway", async () => {
	let product: Product = await ProductGateway.insert({
		name: "product",
		description: "desc",
		imgpath: "/img",
		price: 999,
		stock: 3
	});
	expect(product.name).toBe("product");
	expect(product.description).toBe("desc");
	expect(product.imgpath).toBe("/img");
	expect(product.price).toBe(999);
	expect(product.stock).toBe(3);
	expect(product.id).toBeDefined();
	expect(product.created_at).toBeDefined();
	expect(product.created_at).toBeDefined();

	product.name = "prod";
	product = await ProductGateway.update(product);
	expect(product.name).toBe("prod");

	let id = product.id
	product = await ProductGateway.delete(product.id);
	expect(product.id).toBe(id);
});
