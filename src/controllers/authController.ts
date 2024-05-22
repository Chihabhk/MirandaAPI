import { Request, Response } from "express";
import { User } from "../models/user";
import { generateToken } from "../services/authService";
import { randomUUID } from "crypto";

const hardcodedUser: User = {
    id: randomUUID(),
    username: "usuario",
    password: "clave",
    role: "admin",
};

export function login(req: Request, res: Response) {
    const { username, password } = req.body;

    if (
        username === hardcodedUser.username &&
        password === hardcodedUser.password
    ) {
        const token = generateToken(hardcodedUser);
        res.json({ token });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
}
