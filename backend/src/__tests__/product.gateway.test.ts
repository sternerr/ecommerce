import { expect, test } from "vitest";
import { ProductGateway } from "../data/gateways/product.gateway.ts";

test("[Data Layer]: ProductGateway", async () => {
	let product: ProductGateway | undefined = new ProductGateway({ name: "product", price: 999, stock: 3 });
	expect(product.name).toBe("product");
	expect(product.price).toBe(999);
	expect(product.stock).toBe(3);

	await product.insert();
	expect(product.id).toBeDefined();
	expect(product.created_at).toBeDefined();
	expect(product.created_at).toBeDefined();

	product.name = "test";
	product.update();
	expect(product.name).toBe("test");

	const id: string = product.id!;
	product = await ProductGateway.findById(id);
	expect(product!.id).toBe(id);

	product!.delete();
});
