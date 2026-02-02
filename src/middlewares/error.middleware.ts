import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/httpException";

export const ErrorMiddleware = (
    error: HttpException,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const status: number = error.status || 500;
        const message: string = error.message || "Something went wrong";

        console.error(`[ERROR] ${req.method} ${req.path} >> StatusCode:: ${status}, Message:: ${message}`);

        res.status(status).json({
            success: false,
            message,
            stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
        });
    } catch (error) {
        next(error);
    }
};
