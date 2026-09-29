import mongoose, { Schema } from "mongoose";

const TopicSchema = new Schema({
  name: String,
  mastery: { type: Number, default: 0 }
});

const ChapterSchema = new Schema({
  subjectId: { type: Schema.Types.ObjectId, ref: "Subject", index: true },
  name: { type: String, required: true },
  number: Number,
  description: String,
  progress: { type: Number, default: 0 },
  topics: [TopicSchema]
}, { timestamps: true });

const SubjectSchema = new Schema({
  classLevel: { type: Number, required: true, index: true },
  stream: { type: String, required: true, index: true },
  name: { type: String, required: true },
  code: String,
  icon: String,
  color: String,
  totalChapters: Number
}, { timestamps: true });

export const Subject = mongoose.model("Subject", SubjectSchema);
export const Chapter = mongoose.model("Chapter", ChapterSchema);
