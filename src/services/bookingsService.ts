import { randomUUID } from "crypto";
import { BookingInterface } from "../interfaces/bookingInterface";

export async function getBookingsData(): Promise<BookingInterface[]> {
    const uri = "mongodb://localhost:27017";
    const client = new MongoClient(uri);

    try {
        await client.connect();

        const database = client.db("your_database_name");
        const collection = database.collection("your_collection_name");

        const bookings = await collection.find().toArray();

        return bookings;
    } catch (error) {
        console.error("Error retrieving bookings data:", error);
        throw error;
    } finally {
        await client.close();
    }
}

export function getBookingById(
    bookingId: string
): BookingInterface | undefined {
    const bookings = getBookingsData();
    return bookings.find((booking) => booking.id === bookingId);
}

export function createBookingData(booking: BookingInterface): BookingInterface {
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
