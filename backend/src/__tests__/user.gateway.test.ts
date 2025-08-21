import { expect, test } from "vitest";
import { UserGateway, type User } from "../data/gateways/user.gateway.ts";

test("[Data Layer]: UserGateway", async () => {
	let user: User = await UserGateway.insert({ email: "test@test.com", password: "123456", isadmin: true });
	expect(user.email).toBe("test@test.com");
	expect(user.password).toBe("123456");
	expect(user.isadmin).toBe(true);
	expect(user.id).toBeDefined();
	expect(user.created_at).toBeDefined();
	expect(user.created_at).toBeDefined();

	const id: string = user.id!
	let u = await UserGateway.findById(user);
	expect(u!.id).toBe(id);

	let deleteId: string = await UserGateway.delete(user);
	expect(deleteId).toBe(id);
});
