import { Router } from "express";
import { Question } from "../models/Question";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const filter: any = { approved: true };
    for (const key of ["subjectId", "chapterId", "difficulty", "topic"]) {
      if (req.query[key]) filter[key] = req.query[key];
    }
    const limit = Math.min(Number(req.query.limit ?? 20), 50);
    const questions = await Question.find(filter).limit(limit).lean();
    res.json({ success: true, data: questions });
  } catch (e) { next(e); }
});

router.get("/:id", async (req, res, next) => {
  try {
    const question = await Question.findOne({ _id: req.params.id, approved: true }).lean();
    if (!question) return res.status(404).json({ success: false, message: "Question not found" });
    res.json({ success: true, data: question });
  } catch (e) { next(e); }
});

export default router;
