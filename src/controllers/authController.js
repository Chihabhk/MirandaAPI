"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const authService_1 = require("../services/authService");
const crypto_1 = require("crypto");
const hardcodedUser = {
    id: (0, crypto_1.randomUUID)(),
    username: "usuario",
    password: "clave",
    role: "admin",
};
function login(req, res) {
    const { username, password } = req.body;
    if (username === hardcodedUser.username &&
        password === hardcodedUser.password) {
        const token = (0, authService_1.generateToken)(hardcodedUser);
        res.json({ token });
    }
    else {
        res.status(401).json({ message: "Invalid credentials" });
    }
}
exports.login = login;
