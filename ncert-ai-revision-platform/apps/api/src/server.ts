import mongoose from "mongoose";
import { app } from "./app";
import { env } from "./config/env";

mongoose.connect(env.mongoUri).then(() => {
  app.listen(env.port, () => console.log(`API running on http://localhost:${env.port}`));
}).catch(err => {
  console.error("MongoDB connection failed", err);
  process.exit(1);
});
