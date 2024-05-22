"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoom = exports.updateRoom = exports.createRoom = exports.getRoom = exports.getRooms = void 0;
const roomsService_1 = require("../services/roomsService");
function getRooms(req, res) {
    const rooms = (0, roomsService_1.getRoomsData)();
    res.json(rooms);
}
exports.getRooms = getRooms;
function getRoom(req, res) {
    const roomId = req.params.id;
    0;
    const room = (0, roomsService_1.getRoomById)(roomId);
    if (room) {
        res.json(room);
    }
    else {
        res.status(404).json({ message: "Room not found" });
    }
}
exports.getRoom = getRoom;
function createRoom(req, res) {
    const room = req.body;
    const createdRoom = (0, roomsService_1.createRoomData)(room);
    res.json(createdRoom);
}
exports.createRoom = createRoom;
function updateRoom(req, res) {
    const roomId = req.params.id;
    const updatedFields = req.body;
    try {
        const room = (0, roomsService_1.getRoomById)(roomId);
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }
        const updatedRoom = Object.assign(Object.assign({}, room), updatedFields);
        const updatedRoomData = (0, roomsService_1.updateRoomData)(updatedRoom);
        res.json(updatedRoomData);
    }
    catch (error) {
        res.status(500).json({ message: "Error updating room data" });
    }
}
exports.updateRoom = updateRoom;
function deleteRoom(req, res) {
    const roomId = req.params.id;
    try {
        (0, roomsService_1.deleteRoomData)(roomId);
        res.json({ message: "Room deleted successfully" });
    }
    catch (error) {
        res.status(404).json({ message: "Room not found" });
    }
}
exports.deleteRoom = deleteRoom;
