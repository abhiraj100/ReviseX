import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { env } from "./config/env";
import { User } from "./models/User";
import { Subject, Chapter } from "./models/Content";
import { Question } from "./models/Question";

async function seed() {
  await mongoose.connect(env.mongoUri);
  await Promise.all([User.deleteMany({}), Subject.deleteMany({}), Chapter.deleteMany({}), Question.deleteMany({})]);

  const passwordHash = await bcrypt.hash("Student@123", 12);
  await User.create({
    name: "Demo Student",
    email: "student@example.com",
    passwordHash,
    role: "student",
    classLevel: 11,
    stream: "science",
    subjects: ["Physics", "Chemistry", "Mathematics", "Biology"],
    streak: 8,
    xp: 1240
  });

  const subjects = await Subject.insertMany([
    { classLevel: 11, stream: "science", name: "Physics", code: "PHY", icon: "atom", totalChapters: 15 },
    { classLevel: 11, stream: "science", name: "Chemistry", code: "CHE", icon: "flask", totalChapters: 14 },
    { classLevel: 11, stream: "science", name: "Mathematics", code: "MAT", icon: "function", totalChapters: 16 },
    { classLevel: 11, stream: "science", name: "Biology", code: "BIO", icon: "leaf", totalChapters: 22 },
    { classLevel: 12, stream: "science", name: "Physics", code: "PHY12", icon: "atom", totalChapters: 14 },
    { classLevel: 12, stream: "commerce", name: "Accountancy", code: "ACC", icon: "calculator", totalChapters: 12 },
    { classLevel: 12, stream: "humanities", name: "Political Science", code: "POL", icon: "landmark", totalChapters: 8 }
  ]);

  const physics = subjects.find(s => s.name === "Physics" && s.classLevel === 11)!;
  const chemistry = subjects.find(s => s.name === "Chemistry")!;
  const chapters = await Chapter.insertMany([
    { subjectId: physics._id, name: "Units and Measurements", number: 1, description: "Physical quantities, units, dimensions and measurement.", progress: 84, topics: [{ name: "SI Units", mastery: 92 }, { name: "Dimensions", mastery: 76 }, { name: "Significant Figures", mastery: 68 }] },
    { subjectId: physics._id, name: "Motion in a Straight Line", number: 2, description: "Position, velocity, acceleration and graphs.", progress: 72, topics: [{ name: "Velocity", mastery: 80 }, { name: "Acceleration", mastery: 61 }, { name: "Graphs", mastery: 70 }] },
    { subjectId: physics._id, name: "Laws of Motion", number: 5, description: "Newton's laws, force and friction.", progress: 58, topics: [{ name: "Newton's Laws", mastery: 62 }, { name: "Friction", mastery: 48 }, { name: "Free Body Diagrams", mastery: 55 }] },
    { subjectId: chemistry._id, name: "Structure of Atom", number: 2, description: "Atomic models, quantum numbers and electronic structure.", progress: 64, topics: [{ name: "Atomic Models", mastery: 72 }, { name: "Quantum Numbers", mastery: 58 }] }
  ]);

  const laws = chapters.find(c => c.name === "Laws of Motion")!;
  await Question.insertMany([
    {
      subjectId: physics._id, chapterId: laws._id, topic: "Newton's Laws",
      question: "According to Newton's second law, the net force acting on an object is proportional to its...",
      options: ["velocity", "acceleration", "displacement", "momentum only"],
      correctIndex: 1,
      explanation: "Newton's second law relates net force to mass and acceleration: F = ma. For a fixed mass, force is proportional to acceleration.",
      difficulty: "easy",
      source: { documentId: "approved-demo-source", chapter: "Laws of Motion", page: 1, chunkId: "laws-1" },
      tags: ["newton", "force", "acceleration"]
    },
    {
      subjectId: physics._id, chapterId: laws._id, topic: "Free Body Diagrams",
      question: "A free-body diagram is primarily used to represent...",
      options: ["only the path of an object", "forces acting on an isolated object", "the object's temperature", "its chemical composition"],
      correctIndex: 1,
      explanation: "A free-body diagram isolates an object and represents the external forces acting on it.",
      difficulty: "easy",
      source: { documentId: "approved-demo-source", chapter: "Laws of Motion", page: 2, chunkId: "laws-2" },
      tags: ["forces", "diagram"]
    },
    {
      subjectId: physics._id, chapterId: laws._id, topic: "Friction",
      question: "Friction generally acts in a direction that...",
      options: ["always points upward", "opposes relative motion or its tendency", "always points toward the centre", "is independent of contact"],
      correctIndex: 1,
      explanation: "Friction acts to oppose relative motion between surfaces, or the tendency of such motion.",
      difficulty: "medium",
      source: { documentId: "approved-demo-source", chapter: "Laws of Motion", page: 3, chunkId: "laws-3" },
      tags: ["friction"]
    }
  ]);

  console.log("Seed complete. student@example.com / Student@123");
  await mongoose.disconnect();
}
seed().catch(err => { console.error(err); process.exit(1); });
