"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roomsController_1 = require("../controllers/roomsController");
const roomsRouter = express_1.default.Router();
roomsRouter.get("/", roomsController_1.getRooms);
roomsRouter.get("/:id", roomsController_1.getRoom);
roomsRouter.post("/", roomsController_1.createRoom);
roomsRouter.put("/:id", roomsController_1.updateRoom);
roomsRouter.delete("/:id", roomsController_1.deleteRoom);
exports.default = roomsRouter;
