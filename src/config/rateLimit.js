import rateLimit from "express-rate-limit";

export const rateLimitConfig = rateLimit({
  windowMs: 5 * 60 * 1000, // 15 menit
  max: 50, // Maksimal 100 request per IP
  message: "Too many requests from this IP, please try again later.",
  standardHeaders: true, // Mengembalikan informasi rate limit di header `RateLimit-*`
  legacyHeaders: false, // Nonaktifkan header `X-RateLimit-*`
});
