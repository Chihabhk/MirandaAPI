interface Room {
    id: number;
    number: number;
    type: string;
    price: number;
    status: boolean;
    photo: string;
    amenities?: string[];
    offer?: number;
}

export default Room;
