import { Request, Response } from "express";
import {
    getBookingsData,
    createBookingData,
    updateBookingData,
    deleteBookingData,
    getBookingById,
} from "../services/bookingsService";
import Booking from "../models/booking";

export function getBookings(req: Request, res: Response) {
    const bookings = getBookingsData();
    res.json(bookings);
}

export function getBooking(req: Request, res: Response) {
    const bookingId = req.params.id as Booking["id"];

    const booking = getBookingById(bookingId);

    if (booking) {
        res.json(booking);
    } else {
        res.status(404).json({ message: "Booking not found" });
    }
}

export function createBooking(req: Request, res: Response) {
    const booking = req.body;
    const createdBooking = createBookingData(booking);
    res.json(createdBooking);
}

export function updateBooking(req: Request, res: Response) {
    const bookingId = req.params.id as Booking["id"];
    const updatedFields = req.body;

    try {
        const booking = getBookingById(bookingId);

        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        const updatedBooking = {
            ...booking,
            ...updatedFields,
        };

        const updatedBookingData = updateBookingData(updatedBooking);

        res.json(updatedBookingData);
    } catch (error) {
        res.status(500).json({ message: "Error updating booking data" });
    }
}

export function deleteBooking(req: Request, res: Response) {
    const bookingId = req.params.id as Booking["id"];

    try {
        deleteBookingData(bookingId);
        res.json({ message: "Booking deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: "Booking not found" });
    }
}
