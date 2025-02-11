import List from "../models/listModel.js";
import User from "../models/userModel.js";

export const addTask = async (req, res) => {
    try {
        const { title, body, email } = req.body;

        // Check for missing fields
        if (!title || !body) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!"
            });
        }

        // Find user by email
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            });
        }

        // Create and save the new task
        const list = new List({ title, body, user: existingUser._id });
        await list.save();

        // Associate task with user and save
        existingUser.list.push(list._id);
        await existingUser.save();

        res.status(201).json({
            success: true,
            message: "Task added successfully!",
            task: list
        });

    } catch (error) {
        console.error("Error adding task:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error. Please try again later."
        });
    }
};

export const updateTask = async (req, res) => {
    try {
        const { title, body, email } = req.body;
        const { id } = req.params; // Extract task ID from URL params

        // Check for missing fields
        if (!title || !body) {
            return res.status(400).json({
                success: false,
                message: "All fields required!"
            });
        }

        // Check if user exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            });
        }

        // Find and update task
        const updatedTask = await List.findByIdAndUpdate(
            id,
            { title, body },
            { new: true, runValidators: true } // Return updated document & apply validation
        );

        if (!updatedTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found!"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task updated successfully!",
            task: updatedTask
        });

    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error. Please try again later."
        });
    }
};

// Delete Task
export const deleteTask = async (req, res) => {
    try {
        const { email } = req.body;
        const { id } = req.params; // Extract task ID from URL params

        // Check if required fields are provided
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required!"
            });
        }

        // Check if the user exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({
                success: false,
                message: "User not found!"
            });
        }

        // Find and delete the task
        const deletedTask = await List.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found!"
            });
        }

        // Remove the task reference from the user's list array
        existingUser.list = existingUser.list.filter(taskId => taskId.toString() !== id);
        await existingUser.save();

        res.status(200).json({
            success: true,
            message: "Task deleted successfully!",
            deletedTask
        });

    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error. Please try again later."
        });
    }
};

// fetch list

export const fetchTasks = async (req, res) => {
    try {
        const userId = req.params.id; // Get user ID from authenticated request

        // const list = await List.find({ user: userId });
        // res.status(200).json({ list: list })

        const user = await User.findById(userId).populate("list");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found!",
            });
        }

        if (user.list.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No tasks added yet!",
                tasks: []
            });
        }

        res.status(200).json({
            success: true,
            tasks: user.list, // Return only the tasks associated with the user
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch tasks!",
            error
        });
    }
};
