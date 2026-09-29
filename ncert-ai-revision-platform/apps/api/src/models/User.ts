import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, index: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["student", "teacher", "admin"], default: "student" },
  classLevel: { type: Number, enum: [11, 12], default: 11 },
  stream: { type: String, enum: ["science", "commerce", "humanities"], default: "science" },
  subjects: [{ type: String }],
  streak: { type: Number, default: 7 },
  xp: { type: Number, default: 1240 }
}, { timestamps: true });

export const User = mongoose.model("User", UserSchema);
