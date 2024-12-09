import { getRoomsData, createRoomData, updateRoomData, deleteRoomData, getRoomById, } from "../services/roomsService";
export function getRooms(req, res) {
    const rooms = getRoomsData();
    res.json(rooms);
}
export function getRoom(req, res) {
    const roomId = req.params.id;
    0;
    const room = getRoomById(roomId);
    if (room) {
        res.json(room);
    }
    else {
        res.status(404).json({ message: "Room not found" });
    }
}
export function createRoom(req, res) {
    const room = req.body;
    const createdRoom = createRoomData(room);
    res.json(createdRoom);
}
export function updateRoom(req, res) {
    const roomId = req.params.id;
    const updatedFields = req.body;
    try {
        const room = getRoomById(roomId);
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }
        const updatedRoom = Object.assign(Object.assign({}, room), updatedFields);
        const updatedRoomData = updateRoomData(updatedRoom);
        res.json(updatedRoomData);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating room data" });
    }
}
export function deleteRoom(req, res) {
    const roomId = req.params.id;
    try {
        deleteRoomData(roomId);
        res.json({ message: "Room deleted successfully" });
    }
    catch (error) {
        res.status(404).json({ message: "Room not found" });
    }
}
