const faqsController = {};
import faqsModel from "../models/faqs.js";

// S E L E C T
faqsController.getFaqs = async (req, res) => {
  try {
    const faqs = await faqsModel.find();
    res.status(200).json(faqs);
  } catch (error) {
    res.status(400).json({ message: "Error fetching FAQs", error });
  }
};

// I N S E R T
faqsController.insertFaqs = async (req, res) => {
  try {
    const { question, answer, level, isActive } = req.body;

    if(level < 1 || level > 5) {
        return res.status(400).json({ message: "Level must be between 1 and 5" });
    }

    if (!question || !answer || typeof isActive !== 'boolean') {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (question.length < 4 || answer.length < 4) {
        return res.status(400).json({ message: "Question and answer must be at least 4 characters long" });
    }
    
    const newFaqs = new faqsModel({ question, answer, level, isActive });
    await newFaqs.save();
    res.status(200).json({ message: "FAQs saved" });
  } catch (error) {
    res.status(400).json({ message: "Error saving FAQs", error });
  }
};

// D E L E T E
faqsController.deleteFaqs = async (req, res) => {
  try {
    await faqsModel.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "FAQs deleted" });
  } catch (error) {
    res.status(400).json({ message: "Error deleting FAQs", error });
  }
};

// U P D A T E
faqsController.updateFaqs = async (req, res) => {
  try {
    const { question, answer, level, isActive } = req.body;
    const updateFaqs = await faqsModel.findByIdAndUpdate(
      req.params.id,
      { question, answer, level, isActive },
      { new: true }
    );

    if (!updateFaqs) {
      res.status(400).json({ message: "FAQs not found" });
    } else {
      res.status(200).json({ message: "FAQs updated" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error updating FAQs", error });
  }
};

export default faqsController;