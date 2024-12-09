import { getBookingsData, createBookingData, updateBookingData, deleteBookingData, getBookingById, } from "../services/bookingsService";
export function getBookings(req, res) {
    const bookings = getBookingsData();
    res.json(bookings);
}
export function getBooking(req, res) {
    const bookingId = req.params.id;
    const booking = getBookingById(bookingId);
    if (booking) {
        res.json(booking);
    }
    else {
        res.status(404).json({ message: "Booking not found" });
    }
}
export function createBooking(req, res) {
    const booking = req.body;
    const createdBooking = createBookingData(booking);
    res.json(createdBooking);
}
export function updateBooking(req, res) {
    const bookingId = req.params.id;
    const updatedFields = req.body;
    try {
        const booking = getBookingById(bookingId);
        if (!booking) {
            return res.status(404).json({ message: "Booking not found" });
        }
        const updatedBooking = Object.assign(Object.assign({}, booking), updatedFields);
        const updatedBookingData = updateBookingData(updatedBooking);
        res.json(updatedBookingData);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating booking data" });
    }
}
export function deleteBooking(req, res) {
    const bookingId = req.params.id;
    try {
        deleteBookingData(bookingId);
        res.json({ message: "Booking deleted successfully" });
    }
    catch (error) {
        res.status(404).json({ message: "Booking not found" });
    }
}
