import express from "express";
import { getRooms, createRoom, updateRoom, deleteRoom, getRoom, } from "../controllers/roomsController";
const roomsRouter = express.Router();
roomsRouter.get("/", getRooms);
roomsRouter.get("/:id", getRoom);
roomsRouter.post("/", createRoom);
roomsRouter.put("/:id", updateRoom);
roomsRouter.delete("/:id", deleteRoom);
export default roomsRouter;
