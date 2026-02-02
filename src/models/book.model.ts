import { Schema, model, Document } from "mongoose";

export interface IBook extends Document {
    title: string;
    author: string;
    genre: string;
    price: number;
    stock: number;
    isbn: string;
}

const bookSchema = new Schema<IBook>(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        genre: { type: String, required: true },
        price: { type: Number, required: true },
        stock: { type: Number, default: 0 },
        isbn: { type: String, unique: true },
    },
    { timestamps: true }
);

export const BookModel = model<IBook>("Book", bookSchema);
