import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { HttpException } from "../exceptions/httpException";
import { UserModel } from "../models/user.model";

export interface RequestWithUser extends Request {
    user: any;
}

export const AuthMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const Authorization = req.header("Authorization")?.split("Bearer ")[1];

        if (Authorization) {
            const secretKey = process.env.JWT_SECRET || "default_secret";
            const verificationResponse = jwt.verify(Authorization, secretKey) as any;
            const userId = verificationResponse.id;
            const findUser = await UserModel.findById(userId);

            if (findUser) {
                req.user = findUser;
                next();
            } else {
                next(new HttpException(401, "Wrong authentication token"));
            }
        } else {
            next(new HttpException(404, "Authentication token missing"));
        }
    } catch (error) {
        next(new HttpException(401, "Wrong authentication token"));
    }
};
