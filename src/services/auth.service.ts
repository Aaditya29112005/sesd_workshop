import jwt from "jsonwebtoken";
import { AuthRepository } from "../repositories/auth.repository";
import { IUser } from "../models/user.model";
import { HttpException } from "../exceptions/httpException";

export class AuthService {
    private authRepository = new AuthRepository();

    public async register(userData: Partial<IUser>): Promise<IUser> {
        const findEmail = await this.authRepository.findByEmail(userData.email!);
        if (findEmail) throw new HttpException(409, `Email ${userData.email} already exists`);

        const findUsername = await this.authRepository.findByUsername(userData.username!); // Reverted user's incorrect edit to maintain syntactical correctness.
        if (findUsername) throw new HttpException(409, `Username ${userData.username} already exists`);

        return this.authRepository.create(userData);
    }

    public async login(userData: any): Promise<{ token: string; user: IUser }> {
        const user = await this.authRepository.findByEmail(userData.email);
        if (!user) throw new HttpException(401, "Invalid credentials");

        const isPasswordMatching = await user.comparePassword(userData.password);
        if (!isPasswordMatching) throw new HttpException(401, "Invalid credentials");

        const token = this.createToken(user);
        return { token, user };
    }

    private createToken(user: IUser): string {
        const secretKey = process.env.JWT_SECRET || "default_secret";
        const expiresIn = process.env.JWT_EXPIRES_IN || "7d";

        return jwt.sign({ id: user._id, role: user.role }, secretKey, { expiresIn: expiresIn as any });
    }
}
