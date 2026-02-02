import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
    private authService = new AuthService();

    public register = async (req: Request, res: Response) => {
        const userData = req.body;
        const user = await this.authService.register(userData);
        res.status(201).json({ success: true, data: user, message: "User registered successfully" });
    };

    public login = async (req: Request, res: Response) => {
        const userData = req.body;
        const { token, user } = await this.authService.login(userData);
        res.status(200).json({ success: true, token, data: user, message: "Logged in successfully" });
    };
}
