import { Schema, model } from "mongoose";

const faqsSchema = new Schema(
  {
    question: {
        type: String,
        require: true,
        minLength: 4,
        trim: true
    },
    answer: {
        type: String,
        require: true,
        minLength: 4,
        trim: true
    },
    level: {
        type: Number,
        min: 1,
        max: 5,
        trim: true,
        required: true
    },
    isActive: {
        type: Boolean,
        require: true,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Faqs", faqsSchema);