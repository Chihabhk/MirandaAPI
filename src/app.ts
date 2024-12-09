import express from "express";
import roomsRouter from "./routes/roomsRouter";
import bookingsRouter from "./routes/bookingsRouter";
import authRouter from "./routes/authRouter";
import { authenticateToken } from "./middleware/auth";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/auth", authRouter);
app.use("/rooms", authenticateToken, roomsRouter);
app.use("/bookings", authenticateToken, bookingsRouter);

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

export default app;
