import { Router } from "express";
import AuthController from "../controllers/auth.controller.ts";

const authRouter: Router = Router();

authRouter.post("/sign-up", AuthController.signUp);
authRouter.post("/sign-in", AuthController.signIn);

export default authRouter;
