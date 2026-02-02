import { Request, Response } from "express";
import { BookService } from "../services/book.service";

export class BookController {
    private bookService = new BookService();

    public getBooks = async (req: Request, res: Response) => {
        const result = await this.bookService.getAllBooks(req.query);
        res.status(200).json({ success: true, ...result });
    };

    public getBookById = async (req: Request, res: Response) => {
        const book = await this.bookService.getBookById(req.params.id as string);
        res.status(200).json({ success: true, data: book });
    };

    public createBook = async (req: Request, res: Response) => {
        const book = await this.bookService.createBook(req.body);
        res.status(201).json({ success: true, data: book, message: "Book created successfully" });
    };

    public updateBook = async (req: Request, res: Response) => {
        const book = await this.bookService.updateBook(req.params.id as string, req.body);
        res.status(200).json({ success: true, data: book, message: "Book updated successfully" });
    };

    public deleteBook = async (req: Request, res: Response) => {
        await this.bookService.deleteBook(req.params.id as string);
        res.status(200).json({ success: true, message: "Book deleted successfully" });
    };
}
