"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteRoomData = exports.updateRoomData = exports.createRoomData = exports.getRoomById = exports.getRoomsData = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const crypto_1 = require("crypto");
const filePath = path_1.default.join(__dirname, "../data/rooms/rooms.json");
function getRoomsData() {
    const fileContent = fs_1.default.readFileSync(filePath, "utf-8");
    const rooms = JSON.parse(fileContent);
    return rooms;
}
exports.getRoomsData = getRoomsData;
function getRoomById(roomId) {
    const rooms = getRoomsData();
    return rooms.find((room) => room.id === roomId);
}
exports.getRoomById = getRoomById;
function createRoomData(room) {
    const rooms = getRoomsData();
    const newRoom = {
        id: (0, crypto_1.randomUUID)(),
        number: room.number,
        type: room.type,
        price: room.price,
        status: room.status,
        photoUrl: room.photoUrl,
        amenities: room.amenities,
    };
    rooms.push(newRoom);
    saveRoomsData(rooms);
    return newRoom;
}
exports.createRoomData = createRoomData;
function updateRoomData(updatedRoom) {
    const rooms = getRoomsData();
    const existingRoomIndex = rooms.findIndex((room) => room.id === updatedRoom.id);
    if (existingRoomIndex !== -1) {
        rooms[existingRoomIndex] = Object.assign(Object.assign({}, rooms[existingRoomIndex]), { number: updatedRoom.number, type: updatedRoom.type, price: updatedRoom.price, status: updatedRoom.status, photoUrl: updatedRoom.photoUrl, amenities: updatedRoom.amenities });
        saveRoomsData(rooms);
        return rooms[existingRoomIndex];
    }
    else {
        throw new Error("Room not found");
    }
}
exports.updateRoomData = updateRoomData;
function deleteRoomData(roomId) {
    const rooms = getRoomsData();
    const updatedRooms = rooms.filter((room) => room.id !== roomId);
    if (updatedRooms.length !== rooms.length) {
        saveRoomsData(updatedRooms);
    }
    else {
        throw new Error("Room not found");
    }
}
exports.deleteRoomData = deleteRoomData;
function saveRoomsData(rooms) {
    const jsonData = JSON.stringify(rooms);
    fs_1.default.writeFile(filePath, jsonData, (err) => {
        if (err) {
            console.error("Error al guardar los datos de las habitaciones:", err);
        }
        else {
            console.log("Datos de las habitaciones guardados correctamente.");
        }
    });
}
