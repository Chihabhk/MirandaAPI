import jwt, { JwtPayload } from "jsonwebtoken";
// import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { User } from "../models/user";

dotenv.config();

const JWT_SECRET: string = process.env.JWT_SECRET;

export function generateToken(user: User): string {
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

// export async function comparePasswords(
//     password: string,
//     hashedPassword: string
// ): Promise<boolean> {
//     return await bcrypt.compare(password, hashedPassword);
// }
