"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBooking = exports.updateBooking = exports.createBooking = exports.getBooking = exports.getBookings = void 0;
const bookingsService_1 = require("../services/bookingsService");
function getBookings(req, res) {
    const bookings = (0, bookingsService_1.getBookingsData)();
    res.json(bookings);
}
exports.getBookings = getBookings;
function getBooking(req, res) {
    const bookingId = req.params.id;
    const booking = (0, bookingsService_1.getBookingById)(bookingId);
    if (booking) {
        res.json(booking);
    }
    else {
        res.status(404).json({ message: "Booking not found" });
    }
}
exports.getBooking = getBooking;
function createBooking(req, res) {
    const booking = req.body;
    const createdBooking = (0, bookingsService_1.createBookingData)(booking);
    res.json(createdBooking);
}
exports.createBooking = createBooking;
function updateBooking(req, res) {
    const bookingId = req.params.id;
    const updatedFields = req.body;
    try {
        const booking = (0, bookingsService_1.getBookingById)(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        const updatedBooking = Object.assign(Object.assign({}, booking), updatedFields);
        const updatedBookingData = (0, bookingsService_1.updateBookingData)(updatedBooking);
        res.json(updatedBookingData);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating booking data" });
    }
}
exports.updateBooking = updateBooking;
function deleteBooking(req, res) {
    const bookingId = req.params.id;
    try {
        (0, bookingsService_1.deleteBookingData)(bookingId);
        res.json({ message: "Booking deleted successfully" });
    }
    catch (error) {
        res.status(404).json({ message: "Booking not found" });
    }
}
exports.deleteBooking = deleteBooking;
