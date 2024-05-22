"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookingsController_1 = require("../controllers/bookingsController");
const bookingsRouter = express_1.default.Router();
bookingsRouter.get("/", bookingsController_1.getBookings);
bookingsRouter.get("/:id", bookingsController_1.getBooking);
bookingsRouter.post("/", bookingsController_1.createBooking);
bookingsRouter.put("/:id", bookingsController_1.updateBooking);
bookingsRouter.delete("/:id", bookingsController_1.deleteBooking);
exports.default = bookingsRouter;
