"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookingData = exports.updateBookingData = exports.createBookingData = exports.getBookingById = exports.getBookingsData = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const crypto_1 = require("crypto");
const filePath = path_1.default.join(__dirname, "../data/bookings/bookings.json");
function getBookingsData() {
    const fileContent = fs_1.default.readFileSync(filePath, "utf-8");
    const bookings = JSON.parse(fileContent);
    return bookings;
}
exports.getBookingsData = getBookingsData;
function getBookingById(bookingId) {
    const bookings = getBookingsData();
    return bookings.find((booking) => booking.id === bookingId);
}
exports.getBookingById = getBookingById;
function createBookingData(booking) {
    const bookings = getBookingsData();
    const newBooking = {
        id: (0, crypto_1.randomUUID)(),
        roomId: booking.roomId,
        totalPrice: booking.totalPrice,
        typeRoom: "Double Bed",
        orderDate: booking.orderDate,
        userId: booking.userId,
        checkIn: booking.checkIn,
        checkOut: booking === null || booking === void 0 ? void 0 : booking.checkOut,
        status: booking.status,
    };
    bookings.push(newBooking);
    saveBookingsData(bookings);
    return newBooking;
}
exports.createBookingData = createBookingData;
function updateBookingData(updatedBooking) {
    const bookings = getBookingsData();
    const existingBookingIndex = bookings.findIndex((booking) => booking.id === updatedBooking.id);
    if (existingBookingIndex !== -1) {
        bookings[existingBookingIndex] = Object.assign(Object.assign({}, bookings[existingBookingIndex]), { roomId: updatedBooking.roomId, userId: updatedBooking.userId, checkIn: updatedBooking.checkIn, checkOut: updatedBooking === null || updatedBooking === void 0 ? void 0 : updatedBooking.checkOut, totalPrice: updatedBooking.totalPrice, status: updatedBooking.status });
        saveBookingsData(bookings);
        return bookings[existingBookingIndex];
    }
    else {
        throw new Error("Booking not found");
    }
}
exports.updateBookingData = updateBookingData;
function deleteBookingData(bookingId) {
    const bookings = getBookingsData();
    const updatedBookings = bookings.filter((booking) => booking.id !== bookingId);
    if (updatedBookings.length !== bookings.length) {
        saveBookingsData(updatedBookings);
    }
    else {
        throw new Error("Booking not found");
    }
}
exports.deleteBookingData = deleteBookingData;
function saveBookingsData(bookings) {
    const jsonData = JSON.stringify(bookings);
    fs_1.default.writeFile(filePath, jsonData, (err) => {
        if (err) {
            console.error("Error al guardar los datos de las reservas:", err);
        }
        else {
            console.log("Datos de las reservas guardados correctamente.");
        }
    });
}
