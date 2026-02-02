import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    role: "admin" | "user";
    comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        role: { type: String, enum: ["admin", "user"], default: "user" },
    },
    { timestamps: true }
);

userSchema.pre("save", async function (next: any) {
    const user = this as IUser;
    if (!user.isModified("password")) return next();
    user.password = await bcrypt.hash(user.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (password: string) {
    return bcrypt.compare(password, this.password);
};

export const UserModel = model<IUser>("User", userSchema);
