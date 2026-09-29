import mongoose, { Schema } from "mongoose";

const QuestionSchema = new Schema({
  subjectId: { type: Schema.Types.ObjectId, ref: "Subject", index: true },
  chapterId: { type: Schema.Types.ObjectId, ref: "Chapter", index: true },
  topic: { type: String, index: true },
  question: { type: String, required: true },
  type: { type: String, enum: ["mcq", "true_false", "short_answer"], default: "mcq" },
  options: [{ type: String }],
  correctIndex: Number,
  explanation: String,
  difficulty: { type: String, enum: ["easy", "medium", "hard"], default: "medium", index: true },
  source: {
    documentId: String,
    chapter: String,
    page: Number,
    chunkId: String
  },
  tags: [String],
  approved: { type: Boolean, default: true }
}, { timestamps: true });

export const Question = mongoose.model("Question", QuestionSchema);
