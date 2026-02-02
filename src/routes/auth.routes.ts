import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { Routes } from "../utils/route.Interface";
import { asyncHandler } from "../utils/asyncHandler";

export class AuthRoutes implements Routes {
    public path = "/auth";
    public router = Router();
    private authController = new AuthController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/register`, asyncHandler(this.authController.register));
        this.router.post(`${this.path}/login`, asyncHandler(this.authController.login));
    }
}
