import fs from "fs";
import path from "path";
import Room from "../models/room";

const filePath = path.join(__dirname, "../data/rooms/rooms.json");

export function getRoomsData(): Room[] {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const rooms: Room[] = JSON.parse(fileContent);
    return rooms;
}

export function getRoomById(roomId: number): Room | undefined {
    const rooms = getRoomsData();
    return rooms.find((room) => room.id === roomId);
}

export function createRoomData(room: Room): Room {
    const rooms = getRoomsData();

    const newRoom: Room = {
        id: rooms.length + 1,
        number: room.number,
        type: room.type,
        price: room.price,
        status: room.status,
        photo: room.photo,
        amenities: room.amenities,
        offer: room.offer,
    };

    rooms.push(newRoom);
    saveRoomsData(rooms);

    return newRoom;
}

export function updateRoomData(updatedRoom: Room): Room {
    const rooms = getRoomsData();

    const existingRoomIndex = rooms.findIndex(
        (room) => room.id === updatedRoom.id
    );

    if (existingRoomIndex !== -1) {
        rooms[existingRoomIndex] = {
            ...rooms[existingRoomIndex],
            number: updatedRoom.number,
            type: updatedRoom.type,
            price: updatedRoom.price,
            status: updatedRoom.status,
            photo: updatedRoom.photo,
            amenities: updatedRoom.amenities,
            offer: updatedRoom.offer,
        };

        saveRoomsData(rooms);
        return rooms[existingRoomIndex];
    } else {
        throw new Error("Room not found");
    }
}
export function deleteRoomData(roomId: number): void {
    const rooms = getRoomsData();

    const updatedRooms = rooms.filter((room) => room.id !== roomId);

    if (updatedRooms.length !== rooms.length) {
        saveRoomsData(updatedRooms);
    } else {
        throw new Error("Room not found");
    }
}

function saveRoomsData(rooms: Room[]) {
    const jsonData = JSON.stringify(rooms);

    fs.writeFile(filePath, jsonData, (err) => {
        if (err) {
            console.error(
                "Error al guardar los datos de las habitaciones:",
                err
            );
        } else {
            console.log("Datos de las habitaciones guardados correctamente.");
        }
    });
}
