import express from "express";
import {
    getBooking,
    getBookings,
    createBooking,
    updateBooking,
    deleteBooking,
} from "../controllers/bookingsController.ts";
import { authenticateToken } from "../middleware/auth";

const BookingsRouter = express.Router();

BookingsRouter.get("/", getBookings);
BookingsRouter.get("/:id", getBooking);
BookingsRouter.post("/", createBooking);
BookingsRouter.put("/:id", updateBooking);
BookingsRouter.delete("/:id", deleteBooking);

export default BookingsRouter;
