import express from "express";
import dotenv from "dotenv";
import path from "path";
import mongoose from "mongoose";
import userRouter from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import { checkForAuthenticationCookie } from "./middleware/authentication.js";
import blogRouter from "./routes/blog.router.js";
import Blog from "./models/blog.models.js";
import { rateLimitMiddleware } from "./middleware/ratelimiter.js";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(rateLimitMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.resolve("./public")));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.get("/", async (req, res) => {
  const blogs = await Blog.find({}).sort({ createdAt: -1 }).populate("creator");
  return res.render("homepage", { user: req.user, blogs: blogs });
});

app.use("/user", userRouter);
await mongoose
  .connect(`${process.env.MONGO_URL}`)
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/blog", blogRouter);

app.get("/ping", (req, res) => {
  return res.status(400).send("pong");
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
