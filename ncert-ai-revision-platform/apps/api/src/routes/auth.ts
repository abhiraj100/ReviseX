import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { User } from "../models/User";
import { env } from "../config/env";
import { auth, AuthRequest } from "../middleware/auth";

const router = Router();

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  classLevel: z.union([z.literal(11), z.literal(12)]).default(11),
  stream: z.enum(["science", "commerce", "humanities"]).default("science")
});

router.post("/register", async (req, res, next) => {
  try {
    const data = registerSchema.parse(req.body);
    const existing = await User.findOne({ email: data.email });
    if (existing) return res.status(409).json({ success: false, message: "Email already registered" });
    const passwordHash = await bcrypt.hash(data.password, 12);
    const user = await User.create({ ...data, passwordHash });
    const token = jwt.sign({ id: user.id, role: user.role }, env.jwtSecret, { expiresIn: env.jwtExpiresIn as any });
    res.status(201).json({ success: true, data: { token, user: { id: user.id, name: user.name, email: user.email, role: user.role, classLevel: user.classLevel, stream: user.stream } } });
  } catch (e) { next(e); }
});

router.post("/login", async (req, res, next) => {
  try {
    const data = z.object({ email: z.string().email(), password: z.string() }).parse(req.body);
    const user = await User.findOne({ email: data.email });
    if (!user || !(await bcrypt.compare(data.password, user.passwordHash))) return res.status(401).json({ success: false, message: "Invalid email or password" });
    const token = jwt.sign({ id: user.id, role: user.role }, env.jwtSecret, { expiresIn: env.jwtExpiresIn as any });
    res.json({ success: true, data: { token, user: { id: user.id, name: user.name, email: user.email, role: user.role, classLevel: user.classLevel, stream: user.stream, streak: user.streak, xp: user.xp } } });
  } catch (e) { next(e); }
});

router.get("/me", auth, async (req: AuthRequest, res, next) => {
  try {
    const user = await User.findById(req.user!.id).select("-passwordHash");
    res.json({ success: true, data: user });
  } catch (e) { next(e); }
});

export default router;
