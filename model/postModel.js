import mongoose from "mongoose";
const Post = new mongoose.Schema({
    userId:Number,
    title:String,
    content:String,
    tags:Array,
    createdAt:Date
})
export default mongoose.model("Post",Post)