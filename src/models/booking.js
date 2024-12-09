import mongoose from "mongoose";
const bookingSchema = new mongoose.Schema({
    id: { String, required: true },
    roomId: { String, required: true },
    userId: { String, required: true },
    orderDate: {
        date: String,
        hour: String,
    },
    checkIn: {
        date: String,
        hour: String,
    },
    checkOut: {
        date: String,
        hour: String,
    },
    totalPrice: Number,
    typeRoom: String,
    notes: String,
    status: String,
});
const BookingModel = mongoose.model("Booking", bookingSchema);
export default BookingModel;
