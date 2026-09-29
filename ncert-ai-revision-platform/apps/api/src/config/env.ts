import "dotenv/config";

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: Number(process.env.PORT ?? 5000),
  mongoUri: process.env.MONGODB_URI ?? "mongodb://localhost:27017/ncert_ai",
  jwtSecret: process.env.JWT_SECRET ?? "development-secret-change-me",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "7d",
  clientUrl: process.env.CLIENT_URL ?? "http://localhost:5173",
  aiProvider: process.env.AI_PROVIDER ?? "demo",
  aiApiKey: process.env.AI_API_KEY ?? "",
  aiModel: process.env.AI_MODEL ?? "",
  aiBaseUrl: process.env.AI_BASE_URL ?? "https://api.openai.com/v1"
};
