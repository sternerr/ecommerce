import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller.ts";

const authRouter: Router = Router();

authRouter.post("/sign-up", signUp);
authRouter.post("/sign-in", signIn);

export default authRouter;
