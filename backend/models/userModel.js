import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    list: [
        {
            type: mongoose.Types.ObjectId,
            ref: "List"
        }
    ]
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;