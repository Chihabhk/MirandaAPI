import express from "express";
import {
    getBooking,
    getBookings,
    createBooking,
    updateBooking,
    deleteBooking,
} from "../controllers/bookingsController";

const bookingsRouter = express.Router();

bookingsRouter.get("/", getBookings);
bookingsRouter.get("/:id", getBooking);
bookingsRouter.post("/", createBooking);
bookingsRouter.put("/:id", updateBooking);
bookingsRouter.delete("/:id", deleteBooking);

export default bookingsRouter;
