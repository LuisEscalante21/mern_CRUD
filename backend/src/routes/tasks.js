import express from "express";
import tasksController from "../controllers/tasksController.js";

const router = express.Router();

router
  .route("/")
  .get(tasksController.getTasks)
  .post(tasksController.insertTask);

router
  .route("/:id")
  .put(tasksController.updateTask)
  .delete(tasksController.deleteTask);

export default router;