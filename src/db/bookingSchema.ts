import mongoose from "mongoose";
const { Schema } = mongoose;

const bookingSchema = new Schema({
    _id: { type: String, required: true },
    name: String,
    email: String,
    password: String,
    comments: [{ body: String, date: Date }],
});

export const Booking = mongoose.model("Booking", bookingSchema);
