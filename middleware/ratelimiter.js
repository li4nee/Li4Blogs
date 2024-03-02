import setRateLimit from "express-rate-limit";
const rateLimitMiddleware = setRateLimit({
    windowMs: 60 * 1000,
    max: 30,
    message: "You have exceeded your requests per minute limit !!",
    headers: true,
  });
  export {rateLimitMiddleware}