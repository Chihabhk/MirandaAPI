"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
function generateToken(user) {
    const token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username }, JWT_SECRET, {
        expiresIn: "1h",
    });
    return token;
}
exports.generateToken = generateToken;
function verifyToken(token) {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        return decoded;
    }
    catch (err) {
        throw new Error("Invalid token");
    }
}
exports.verifyToken = verifyToken;
