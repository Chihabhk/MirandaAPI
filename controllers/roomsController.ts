import { Request, Response } from "express";
import {
    getRoomsData,
    createRoomData,
    updateRoomData,
    deleteRoomData,
    getRoomById,
} from "../services/roomsService";

export function getRooms(req: Request, res: Response) {
    const rooms = getRoomsData();
    res.json(rooms);
}
export function getRoom(req: Request, res: Response) {
    const roomId = parseInt(req.params.id);

    const room = getRoomById(roomId);

    if (room) {
        res.json(room);
    } else {
        res.status(404).json({ message: "Room not found" });
    }
}

export function createRoom(req: Request, res: Response) {
    const room = req.body;
    const createdRoom = createRoomData(room);
    res.json(createdRoom);
}

export function updateRoom(req: Request, res: Response) {
    const roomId = parseInt(req.params.id);
    const updatedFields = req.body;

    try {
        const room = getRoomById(roomId);

        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }

        const updatedRoom = {
            ...room,
            ...updatedFields,
        };

        const updatedRoomData = updateRoomData(updatedRoom);

        res.json(updatedRoomData);
    } catch (error) {
        res.status(500).json({ message: "Error updating room data" });
    }
}

export function deleteRoom(req: Request, res: Response) {
    const roomId = parseInt(req.params.id);

    try {
        deleteRoomData(roomId);
        res.json({ message: "Room deleted successfully" });
    } catch (error) {
        res.status(404).json({ message: "Room not found" });
    }
}
