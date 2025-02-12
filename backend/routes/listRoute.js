import express from "express";
import { addTask, deleteTask, fetchTasks, updateTask } from "../controllers/listController.js";

const router = express.Router();

router.route("/addTask").post(addTask);
router.route("/fetchTask/:id").get(fetchTasks);
router.route("/updateTask/:id").put(updateTask);
router.route("/deleteTask/:id").delete(deleteTask);


export default router;