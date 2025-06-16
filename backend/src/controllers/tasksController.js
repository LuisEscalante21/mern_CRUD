const tasksController = {};
import tasksModel from "../models/Tasks.js";

// S E L E C T
tasksController.getTasks = async (req, res) => {
  const tasks = await tasksModel.find();
  res.json(tasks);
};

// I N S E R T
tasksController.insertTask = async (req, res) => {
  const { title, description, completed } = req.body;
  const newTask = new tasksModel({ title, description, completed });
  await newTask.save();
  res.json({ message: "Task saved" });
};

// D E L E T E
tasksController.deleteTask = async (req, res) => {
  await tasksModel.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};

// U P D A T E
tasksController.updateTask = async (req, res) => {
  const { title, description, completed } = req.body;
  const updatedTask = await tasksModel.findByIdAndUpdate(
    req.params.id,
    { title, description, completed },
    { new: true }
  );

  if (!updatedTask) {
    res.json({ message: "Task not found" });
  } else {
    res.json({ message: "Task updated" });
  }
};

export default tasksController;