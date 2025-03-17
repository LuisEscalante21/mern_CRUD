// array de funciones
// del CRUD
const evaluationsController = {};
import evaluationsModel from "../models/Evaluations.js";

// S E L E C T
evaluationsController.getEvaluations = async (req, res) => {
  const evaluations = await evaluationsModel.find().populate("idEmployee");
  res.json(evaluations);
};

// I N S E R T
evaluationsController.insertEvaluations = async (req, res) => {
  const { comment, grade, role, idEmployee} = req.body;
  const newEvaluation = new evaluationsModel({ comment, grade, role, idEmployee});
  await newEvaluation.save();
  res.json({ message: "evaluation saved" });
};

// D E L E T E
evaluationsController.deleteEvaluations = async (req, res) => {
  await evaluationsModel.findByIdAndDelete(req.params.id);
  res.json({ message: "evaluation deleted" });
};

// U P D A T E
evaluationsController.updateEvaluations = async (req, res) => {
  const { comment, grade, role, idEmployee } = req.body;
  const updatedEvaluation = await evaluationsModel.findByIdAndUpdate(
    req.params.id,
    {comment, grade, role, idEmployee},
    { new: true }
  );

  if(!updatedEvaluation){
    res.json({ message: "evaluation not found" });
  }else {
    res.json({ message: "evaluation updated" });
  }
};

export default evaluationsController;
