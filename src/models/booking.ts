import { User } from "./user";

interface DateFormat {
    date: string;
    hour: string;
}
export interface Booking {
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
export default Booking;
