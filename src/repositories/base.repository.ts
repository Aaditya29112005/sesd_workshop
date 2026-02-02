import { Model, Document } from "mongoose";

export abstract class BaseRepository<T extends Document> {
    protected constructor(protected readonly model: Model<T>) { }

    public async findAll(filter: any = {}, options: any = {}): Promise<T[]> {
        const { sortBy = "createdAt", order = "desc", page = 1, limit = 10 } = options;
        const skip = (page - 1) * limit;

        return this.model
            .find(filter)
            .sort({ [sortBy]: order === "desc" ? -1 : 1 })
            .skip(skip)
            .limit(limit)
            .exec();
    }

    public async findOne(filter: any): Promise<T | null> {
        return this.model.findOne(filter).exec();
    }

    public async findById(id: string): Promise<T | null> {
        return this.model.findById(id).exec();
    }

    public async countAll(filter: any = {}): Promise<number> {
        return this.model.countDocuments(filter).exec();
    }

    public async create(data: Partial<T>): Promise<T> {
        return this.model.create(data);
    }

    public async update(id: string, data: any): Promise<T | null> {
        return this.model.findByIdAndUpdate(id, data, { new: true }).exec();
    }

    public async delete(id: string): Promise<T | null> {
        return this.model.findByIdAndDelete(id).exec();
    }
}
