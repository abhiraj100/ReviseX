import mongoose, { Schema } from "mongoose";

const AttemptSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", index: true },
  quizId: { type: Schema.Types.ObjectId, ref: "Quiz" },
  answers: [{
    questionId: Schema.Types.ObjectId,
    selectedIndex: Number,
    correct: Boolean,
    timeSpent: Number
  }],
  score: Number,
  accuracy: Number,
  timeSpent: Number
}, { timestamps: true });

const QuizSchema = new Schema({
  title: String,
  subjectId: { type: Schema.Types.ObjectId, ref: "Subject" },
  questionIds: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  durationMinutes: { type: Number, default: 10 },
  mode: { type: String, enum: ["practice", "exam", "revision"], default: "practice" }
}, { timestamps: true });

export const Quiz = mongoose.model("Quiz", QuizSchema);
export const QuizAttempt = mongoose.model("QuizAttempt", AttemptSchema);
