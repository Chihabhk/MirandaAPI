import mongoose from "mongoose";
import { User } from "./user";

interface DateFormat {
    date: string;
    hour: string;
}

interface Booking {
    id: `${string}-${string}-${string}-${string}-${string}`;
    roomId?: `${string}-${string}-${string}-${string}-${string}`;
    userId: User["id"];
    orderDate: DateFormat;
    checkIn: DateFormat;
    checkOut?: DateFormat;
    totalPrice: number;
    typeRoom: "Double Bed" | "Single" | "Suite" | "Deluxe" | "Twin";
    notes?: string;
    status: "checkIn" | "checkOut" | "inProgess";
}

const bookingSchema = new mongoose.Schema<Booking>({
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

const BookingModel = mongoose.model<Booking>("Booking", bookingSchema);

export default BookingModel;
