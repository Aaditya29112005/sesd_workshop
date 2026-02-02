import { BookRepository } from "../repositories/book.repository";
import { IBook } from "../models/book.model";
import { HttpException } from "../exceptions/httpException";

export class BookService {
    private bookRepository = new BookRepository();

    public async getAllBooks(query: any) {
        const { search, page = 1, limit = 10, sortBy = "createdAt", order = "desc" } = query;
        const options = { page: Number(page), limit: Number(limit), sortBy, order };

        let books: IBook[];
        let total: number;

        if (search) {
            books = await this.bookRepository.searchBooks(search, options);
            total = await this.bookRepository.countSearch(search);
        } else {
            books = await this.bookRepository.findAll({}, options);
            total = await this.bookRepository.countAll({});
        }

        return {
            books,
            pagination: {
                total,
                page: Number(page),
                limit: Number(limit),
                totalPages: Math.ceil(total / Number(limit)),
            },
        };
    }

    public async getBookById(id: string): Promise<IBook> {
        const book = await this.bookRepository.findById(id);
        if (!book) throw new HttpException(404, "Book not found");
        return book;
    }

    public async createBook(bookData: Partial<IBook>): Promise<IBook> {
        return this.bookRepository.create(bookData);
    }

    public async updateBook(id: string, bookData: Partial<IBook>): Promise<IBook> {
        const updatedBook = await this.bookRepository.update(id, bookData);
        if (!updatedBook) throw new HttpException(404, "Book not found");
        return updatedBook;
    }

    public async deleteBook(id: string): Promise<IBook> {
        const deletedBook = await this.bookRepository.delete(id);
        if (!deletedBook) throw new HttpException(404, "Book not found");
        return deletedBook;
    }
}
