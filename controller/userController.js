import User from "../model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Signup
export const register = async (req, res) => {
    try {
        const { name, email, password, role, createdAt} = req.body;

        if (!name || name.length < 2) {
            return res.status(400).json({ message: "Name must be at least 2 characters" });
        }
        if (!password || password.length < 5) {
            return res.status(400).json({ message: "Password must be at least 5 characters" });
        }
        if (password.length > 12) {
            return res.status(400).json({ message: "Password must be less than 12 characters" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
            createdAt:new Date()
        });

        const userResponse = newUser.toObject();
        delete userResponse.password;

        res.status(201).json({ message: "User registered successfully", user: userResponse });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Login
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        });
        
        const { password: _, ...userResponse } = user.toObject();
        res.json({ token, user: userResponse });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
