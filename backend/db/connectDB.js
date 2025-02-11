import mongoose from "mongoose";

const connectDb = async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected!`);
    } catch (error) {
        console.log("Error - DB not connected!", error);
        res.status(400).json({
            message: "DB Not Connected!"
        })
    }
}

export default connectDb;