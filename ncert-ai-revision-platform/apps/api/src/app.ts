import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env";
import authRoutes from "./routes/auth";
import contentRoutes from "./routes/content";
import questionRoutes from "./routes/questions";
import quizRoutes from "./routes/quiz";
import analyticsRoutes from "./routes/analytics";
import aiRoutes from "./routes/ai";

export const app = express();

app.use(helmet());
app.use(cors({ origin: env.clientUrl }));
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

app.get("/health", (_req, res) => res.json({ ok: true, service: "ncert-ai-api" }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1", contentRoutes);
app.use("/api/v1/questions", questionRoutes);
app.use("/api/v1/quizzes", quizRoutes);
app.use("/api/v1/analytics", analyticsRoutes);
app.use("/api/v1/ai", aiRoutes);

app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  const status = err?.name === "ZodError" ? 400 : 500;
  res.status(status).json({ success: false, message: status === 400 ? "Invalid request" : "Internal server error" });
});
