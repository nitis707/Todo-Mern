import User from "../models/userModel.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        if (!email || !username || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields required!"
            })
        }

        // check existing user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send({
                success: false,
                message: "User already exists!"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ email, username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({
            success: true,
            message: "User Registered Successfully!",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong! Please try again.",
            error // Optional: Send error details for debugging (avoid exposing in production)
        });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;


        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields required!"
            })
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password!"
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Incorrect email or password!",
            });
        }

        res.status(200).send({
            success: true,
            message: "Login Successfully!",
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong! Please try again.",
            error // Optional: Send error details for debugging (avoid exposing in production)
        });
    }
}

export const logout = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "Logout Success"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Try again!"
        })
    }
}