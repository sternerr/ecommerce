import { expect, test } from "vitest";
import { UserGateway } from "../data/gateways/user.ts";

test("[Data Layer]: UserGateway", async () => {
	let user: UserGateway | undefined = new UserGateway({ email: "test@test.com", password: "123456" });
	expect(user.email).toBe("test@test.com");
	expect(user.password).toBe("123456");

	await user.insert();
	expect(user.id).toBeDefined();
	expect(user.created_at).toBeDefined();
	expect(user.created_at).toBeDefined();

	user.email = "testa@gmail.com";
	user.update();
	expect(user.email).toBe("testa@gmail.com");

	const id: string = user.id!;
	user = await UserGateway.findById(id);
	expect(user!.id).toBe(id);

	user!.delete();
});
