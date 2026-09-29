import { Router } from "express";
import { z } from "zod";
import { Quiz, QuizAttempt } from "../models/Quiz";
import { Question } from "../models/Question";
import { auth, AuthRequest } from "../middleware/auth";

const router = Router();

router.post("/", auth, async (req: AuthRequest, res, next) => {
  try {
    const input = z.object({
      subjectId: z.string().optional(),
      difficulty: z.enum(["easy", "medium", "hard"]).optional(),
      count: z.number().int().min(1).max(20).default(10),
      mode: z.enum(["practice", "exam", "revision"]).default("practice")
    }).parse(req.body);
    const filter: any = { approved: true };
    if (input.subjectId) filter.subjectId = input.subjectId;
    if (input.difficulty) filter.difficulty = input.difficulty;
    const questions = await Question.aggregate([{ $match: filter }, { $sample: { size: input.count } }]);
    if (!questions.length) return res.status(404).json({ success: false, message: "No questions available for this selection" });
    const quiz = await Quiz.create({ title: "Adaptive Revision Quiz", subjectId: input.subjectId, questionIds: questions.map(q => q._id), durationMinutes: Math.max(5, input.count), mode: input.mode });
    res.status(201).json({ success: true, data: { quiz, questions } });
  } catch (e) { next(e); }
});

router.post("/:id/submit", auth, async (req: AuthRequest, res, next) => {
  try {
    const input = z.object({
      answers: z.array(z.object({ questionId: z.string(), selectedIndex: z.number().int().min(0), timeSpent: z.number().min(0).default(0) }))
    }).parse(req.body);
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ success: false, message: "Quiz not found" });
    const questions = await Question.find({ _id: { $in: quiz.questionIds } }).lean();
    let correct = 0;
    const answers = input.answers.map(a => {
      const q = questions.find(item => String(item._id) === a.questionId);
      const isCorrect = !!q && q.correctIndex === a.selectedIndex;
      if (isCorrect) correct++;
      return { ...a, correct: isCorrect };
    });
    const score = questions.length ? Math.round((correct / questions.length) * 100) : 0;
    const attempt = await QuizAttempt.create({ userId: req.user!.id, quizId: quiz.id, answers, score, accuracy: score, timeSpent: answers.reduce((s, a) => s + a.timeSpent, 0) });
    res.json({ success: true, data: { score, correct, total: questions.length, attemptId: attempt.id, answers } });
  } catch (e) { next(e); }
});

export default router;
