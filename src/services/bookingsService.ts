import { randomUUID } from "crypto";
import { Booking } from "../db/bookingSchema";

export function getBookingsData() {
    return bookings;
}

export function getBookingById(
    bookingId: (typeof Booking)["_id"]
): Booking | undefined {
    const bookings = getBookingsData();
    return bookings.find((booking) => booking.id === bookingId);
}

export function createBookingData(booking: Booking): Booking {
    const bookings = getBookingsData();

    const newBooking: Booking = {
        id: randomUUID(),
        roomId: booking.roomId,
        totalPrice: booking.totalPrice,
        typeRoom: booking.typeRoom,
        orderDate: booking.orderDate,
        userId: booking.userId,
        checkIn: booking.checkIn,
        checkOut: booking?.checkOut,
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
            userId: updatedBooking.userId,
            checkIn: updatedBooking.checkIn,
            checkOut: updatedBooking?.checkOut,
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
