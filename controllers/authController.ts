import { Request, Response } from "express";
import { User } from "../models/user";
import { generateToken } from "../services/authService";

const hardcodedUser: User = {
    id: 1,
    username: "usuario",
    password: "clave",
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
