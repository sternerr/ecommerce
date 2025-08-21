import { expect, test } from "vitest";
import { UserGateway, type User } from "../data/gateways/user.gateway.ts";
import { OrderGateway, type Order } from "../data/gateways/order.gateway.ts";

test("[Data Layer]: OrderGateway", async () => {
	let user: User = await UserGateway.insert({ email: "testa@test.com", password: "123456", isadmin: true });

	let order: Order = await OrderGateway.insert({ totalprice: 2000, user_id: user.id })
	expect(order.totalprice).toBe(2000);
	expect(order.user_id).toBe(user.id);
	expect(order.created_at).toBeDefined();
	expect(order.updated_at).toBeDefined();

	const deletedId = await OrderGateway.delete(order);
	expect(deletedId).toBe(order.id);

	await UserGateway.delete(user);
});
