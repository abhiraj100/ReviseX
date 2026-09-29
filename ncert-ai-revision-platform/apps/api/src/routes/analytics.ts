import { Router } from "express";
import { auth, AuthRequest } from "../middleware/auth";
import { QuizAttempt } from "../models/Quiz";

const router = Router();

router.get("/overview", auth, async (req: AuthRequest, res, next) => {
  try {
    const attempts = await QuizAttempt.find({ userId: req.user!.id }).sort({ createdAt: -1 }).limit(20).lean();
    const average = attempts.length ? Math.round(attempts.reduce((sum, a) => sum + (a.accuracy ?? 0), 0) / attempts.length) : 0;
    const totalQuestions = attempts.reduce((sum, a) => sum + (a.answers?.length ?? 0), 0);
    res.json({
      success: true,
      data: {
        averageAccuracy: average,
        totalQuestions,
        testsTaken: attempts.length,
        recent: attempts.map(a => ({ score: a.score, accuracy: a.accuracy, createdAt: a.createdAt }))
      }
    });
  } catch (e) { next(e); }
});

export default router;
