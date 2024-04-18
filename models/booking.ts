interface Booking {
    id: `${string}-${string}-${string}-${string}-${string}`;
    roomId: `${string}-${string}-${string}-${string}-${string}`;
    userId: string;
    checkIn: string;
    checkOut: string;
}

export default Booking;
