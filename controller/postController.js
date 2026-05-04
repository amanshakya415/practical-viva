import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Signup
export const createPost = async (req, res) => {
    try {
        const {userId, title, content, tags, role, createdAt} = req.body;

        const newPost = await User.create({
            userId, title, content, tags, role, createdAt:new Date()
        });

        const Post= newPost

        res.status(201).json({ message: "Post created successfully", Post: Post });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
