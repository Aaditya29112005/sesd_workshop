import { BaseRepository } from "./base.repository";
import { IUser, UserModel } from "../models/user.model";

export class AuthRepository extends BaseRepository<IUser> {
    constructor() {
        super(UserModel);
    }

    public async findByEmail(email: string): Promise<IUser | null> {
        return this.model.findOne({ email }).exec();
    }

    public async findByUsername(username: string): Promise<IUser | null> {
        return this.model.findOne({ username }).exec();
    }
}
