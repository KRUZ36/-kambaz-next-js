import mongoose from "mongoose";

const attemptSchema = new mongoose.Schema(
  {
    _id: String,
    quiz: String,
    user: String,
    answers: mongoose.Schema.Types.Mixed,
    score: Number,
    submittedAt: Date,
  },
  { collection: "attempts" }
);

export default attemptSchema;