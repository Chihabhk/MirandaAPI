import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema({
    _id: String,
    name: String,
    email: String,
    password: String,
    comments: [{ body: String, date: Date }],
});

export const User = mongoose.model("User", userSchema);
