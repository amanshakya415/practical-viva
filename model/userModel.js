import mongoose from "mongoose";
const User = new mongoose.Schema({
    name:String,
    email:String,
    passwordHash:String,
    role:String,
    createdAt:Date

}) 
export default mongoose.model("User",User)