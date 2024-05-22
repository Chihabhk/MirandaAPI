interface Room {
    id: `${string}-${string}-${string}-${string}-${string}`;
    type: "Double Bed" | "Single" | "Suite" | "Deluxe" | "Twin";
    number: number;
    price: number;
    photoUrl?: string;
    amenities?: string[];
    status: "occupied" | "available";
}

export default Room;
