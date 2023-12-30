import mongoose, { modelNames } from "mongoose";

const userSchema = mongoose.Schema({
    userName: String,
    email: { type: String, unique: true },
    password: String,
    roles: { String }

}, { timestamps: true })

export const User = mongoose.model("users", userSchema);
