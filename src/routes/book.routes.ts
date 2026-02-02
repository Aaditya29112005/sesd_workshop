import { Router } from "express";
import { BookController } from "../controllers/book.controller";
import { Routes } from "../utils/route.Interface";
import { asyncHandler } from "../utils/asyncHandler";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class BookRoutes implements Routes {
    public path = "/books";
    public router = Router();
    private bookController = new BookController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, asyncHandler(this.bookController.getBooks));
        this.router.get(`${this.path}/:id`, asyncHandler(this.bookController.getBookById));

        // Protected routes
        this.router.post(`${this.path}`, AuthMiddleware as any, asyncHandler(this.bookController.createBook));
        this.router.put(`${this.path}/:id`, AuthMiddleware as any, asyncHandler(this.bookController.updateBook));
        this.router.delete(`${this.path}/:id`, AuthMiddleware as any, asyncHandler(this.bookController.deleteBook));
    }
}
