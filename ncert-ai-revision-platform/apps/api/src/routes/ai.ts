import { Router } from "express";
import { z } from "zod";
import { auth, AuthRequest } from "../middleware/auth";
import { getAIProvider } from "../services/ai";

const router = Router();

router.post("/chat", auth, async (req: AuthRequest, res, next) => {
  try {
    const input = z.object({ message: z.string().min(1).max(4000), context: z.array(z.object({ title: z.string(), chapter: z.string().optional(), page: z.number().optional(), chunkId: z.string().optional() })).optional() }).parse(req.body);
    const reply = await getAIProvider().chat(input.message, input.context);
    res.json({ success: true, data: reply });
  } catch (e) { next(e); }
});

export default router;
