// array de funciones
// del CRUD
const reviewsController = {};
import reviewsModel from "../models/Reviews.js";

// S E L E C T
reviewsController.getReviews = async (req, res) => {
  const reviews = await reviewsModel.find().populate("idClient");
  res.json(reviews);
};

// I N S E R T
reviewsController.insertReviews = async (req, res) => {
  const { comment, rating, idClient} = req.body;
  const newReview = new reviewsModel({ comment, rating, idClient });
  await newReview.save();
  res.json({ message: "review saved" });
};

// D E L E T E
reviewsController.deleteReviews = async (req, res) => {
  await reviewsModel.findByIdAndDelete(req.params.id);
  res.json({ message: "review deleted" });
};

// U P D A T E
reviewsController.updateReviews = async (req, res) => {
  const { comment, rating, idClient } = req.body;
  const updatedReview = await reviewsModel.findByIdAndUpdate(
    req.params.id,
    {comment, rating, idClient},
    { new: true }
  );

  if(!updatedReview){
    res.json({ message: "review not found" });
  }else {
    res.json({ message: "review updated" });
  }
};

export default reviewsController;
