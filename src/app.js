"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roomsRouter_1 = __importDefault(require("./routes/roomsRouter"));
const bookingsRouter_1 = __importDefault(require("./routes/bookingsRouter"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const auth_1 = require("./middleware/auth");
const app = (0, express_1.default)();
// Middleware
app.use(express_1.default.json());
// Routes
app.use("/auth", authRouter_1.default);
app.use("/rooms", auth_1.authenticateToken, roomsRouter_1.default);
app.use("/bookings", auth_1.authenticateToken, bookingsRouter_1.default);
// Public route
app.get("/", (req, res) => {
    const hotelName = "Miranda Hotel";
    const endpoints = [
        { path: "/auth/login", methods: ["POST"] },
        { path: "/rooms", methods: ["GET", "POST", "PUT", "DELETE"] },
        { path: "/bookings", methods: ["GET", "POST", "PUT", "DELETE"] },
    ];
    res.json({ hotelName, endpoints });
});
exports.default = app;
