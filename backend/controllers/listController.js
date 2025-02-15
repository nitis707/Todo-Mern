import List from "../models/listModel.js";
import User from "../models/userModel.js";

export const addTask = async (req, res) => {
    try {
        const { title, body, id } = req.body;

        // Check for missing fields
        if (!title || !body) {
            return res.status(400).json({
                success: false,
                message: "All fields are required!"
            });
        }

        // Find user by email
        const existingUser = await User.findById(id);
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
        const { title, body, id: userId } = req.body;  // Changed email to userId
        const { id } = req.params; // Task ID from URL params

        // Check for missing fields
        if (!title || !body) {
            return res.status(400).json({
                success: false,
                message: "All fields required!"
            });
        }

        // Check if user exists
        const existingUser = await User.findById(userId);  // Changed to findById
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
            { new: true, runValidators: true }
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
        const taskId = req.params.id; // Get ID from URL params

        if (!taskId) {
            return res.status(400).json({ success: false, message: "Login to delete Task!" });
        }

        // Find and delete the task
        const deletedTask = await List.findByIdAndDelete(taskId);

        if (!deletedTask) {
            return res.status(404).json({
                success: false,
                message: "Task not found!"
            });
        }

        // Remove task reference from user's list
        await User.updateMany({ list: taskId }, { $pull: { list: taskId } });

        return res.status(200).json({
            success: true,
            message: "Task deleted successfully!"
        });
    } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
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
