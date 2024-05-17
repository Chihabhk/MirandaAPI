import fs from "fs";
import path from "path";
import Booking from "../models/booking";
import { randomUUID } from "crypto";

const filePath = path.join(__dirname, "../data/bookings/bookings.json");

export function getBookingsData(): Booking[] {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const bookings: Booking[] = JSON.parse(fileContent);
    return bookings;
}

export function getBookingById(bookingId: Booking["id"]): Booking | undefined {
    const bookings = getBookingsData();
    return bookings.find((booking) => booking.id === bookingId);
}

export function createBookingData(booking: Booking): Booking {
    const bookings = getBookingsData();

    const newBooking: Booking = {
        id: randomUUID(),
        roomId: booking.roomId,
        UserId: booking.UserId,
        checkInDate: booking.checkIn,
        checkOutDate: booking.checkOut,
        status: booking.status,
    };

    bookings.push(newBooking);
    saveBookingsData(bookings);

    return newBooking;
}

export function updateBookingData(updatedBooking: Booking): Booking {
    const bookings = getBookingsData();

    const existingBookingIndex = bookings.findIndex(
        (booking) => booking.id === updatedBooking.id
    );

    if (existingBookingIndex !== -1) {
        bookings[existingBookingIndex] = {
            ...bookings[existingBookingIndex],
            roomId: updatedBooking.roomId,
            UserId: updatedBooking.UserId,
            checkInDate: updatedBooking.checkInDate,
            checkOutDate: updatedBooking.checkOutDate,
            totalPrice: updatedBooking.totalPrice,
            status: updatedBooking.status,
        };

        saveBookingsData(bookings);
        return bookings[existingBookingIndex];
    } else {
        throw new Error("Booking not found");
    }
}

export function deleteBookingData(bookingId: Booking["id"]): void {
    const bookings = getBookingsData();

    const updatedBookings = bookings.filter(
        (booking) => booking.id !== bookingId
    );

    if (updatedBookings.length !== bookings.length) {
        saveBookingsData(updatedBookings);
    } else {
        throw new Error("Booking not found");
    }
}

function saveBookingsData(bookings: Booking[]) {
    const jsonData = JSON.stringify(bookings);

    fs.writeFile(filePath, jsonData, (err) => {
        if (err) {
            console.error("Error al guardar los datos de las reservas:", err);
        } else {
            console.log("Datos de las reservas guardados correctamente.");
        }
    });
}
