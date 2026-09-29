import { Router } from "express";
import { Subject, Chapter } from "../models/Content";

const router = Router();

router.get("/subjects", async (req, res, next) => {
  try {
    const filter: any = {};
    if (req.query.classLevel) filter.classLevel = Number(req.query.classLevel);
    if (req.query.stream) filter.stream = req.query.stream;
    const subjects = await Subject.find(filter).sort({ name: 1 });
    res.json({ success: true, data: subjects });
  } catch (e) { next(e); }
});

router.get("/subjects/:id", async (req, res, next) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) return res.status(404).json({ success: false, message: "Subject not found" });
    const chapters = await Chapter.find({ subjectId: subject.id }).sort({ number: 1 });
    res.json({ success: true, data: { subject, chapters } });
  } catch (e) { next(e); }
});

router.get("/chapters/:id", async (req, res, next) => {
  try {
    const chapter = await Chapter.findById(req.params.id);
    if (!chapter) return res.status(404).json({ success: false, message: "Chapter not found" });
    res.json({ success: true, data: chapter });
  } catch (e) { next(e); }
});

export default router;
