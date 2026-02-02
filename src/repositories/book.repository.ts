import { BaseRepository } from "./base.repository";
import { IBook, BookModel } from "../models/book.model";

export class BookRepository extends BaseRepository<IBook> {
    constructor() {
        super(BookModel);
    }

    public async searchBooks(query: string, options: any): Promise<IBook[]> {
        const filter = {
            $or: [
                { title: { $regex: query, $options: "i" } },
                { author: { $regex: query, $options: "i" } },
                { genre: { $regex: query, $options: "i" } },
            ],
        };
        return this.findAll(filter, options);
    }

    public async countSearch(query: string): Promise<number> {
        const filter = {
            $or: [
                { title: { $regex: query, $options: "i" } },
                { author: { $regex: query, $options: "i" } },
                { genre: { $regex: query, $options: "i" } },
            ],
        };
        return this.countAll(filter);
    }
}
