import { generateToken } from "../services/authService";
import { randomUUID } from "crypto";
const hardcodedUser = {
    id: randomUUID(),
    username: "usuario",
    password: "clave",
    role: "admin",
};
export function login(req, res) {
    const { username, password } = req.body;
    if (username === hardcodedUser.username &&
        password === hardcodedUser.password) {
        const token = generateToken(hardcodedUser);
        res.json({ token });
    }
    else {
        res.status(401).json({ message: "Invalid credentials" });
    }
}
