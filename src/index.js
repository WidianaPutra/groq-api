import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { rateLimitConfig } from "./config/rateLimit.js";
import { middleware } from "./config/middleware.js";

// controller
import chat from "./controllers/chat.js";

dotenv.config();

const app = express();
app.use(
  cors({ origin: "*", methods: ["POST"] }),
  express.json(),
  rateLimitConfig
);

app.post("/api/chat", middleware, chat);

app.listen(process.env.PORT, () =>
  console.log(`server up and runing on port ${process.env.PORT}`)
);
