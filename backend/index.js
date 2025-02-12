import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./db/connectDB.js";
import userRoute from "./routes/userRoute.js";
import listRoute from "./routes/listRoute.js";

const app = express();
dotenv.config({});
connectDb();

// default middleware
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello from localhost!");
})

app.use("/api/v1", userRoute);
app.use("/api/v1", listRoute);


const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port} successfully!`);
});