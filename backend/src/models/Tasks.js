import { Schema, model } from "mongoose";

const tasksSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 100,
    },
    description: {
      type: String,
      required: true,
      maxLength: 500,
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

export default model("Tasks", tasksSchema);