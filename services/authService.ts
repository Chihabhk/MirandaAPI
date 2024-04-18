import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user";
import dotenv from "dotenv";
dotenv.config();

const JWT_SECRET: any = process.env.JWT_SECRET;

export function generateToken(user: User): any {
    const token = jwt.sign(
        { id: user.id, username: user.username },
        JWT_SECRET,
        {
            expiresIn: "1h",
        }
    );
    return token;
}
export function verifyToken(token: string): JwtPayload | string {
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded as JwtPayload;
    } catch (err) {
        throw new Error("Invalid token");
    }
}
