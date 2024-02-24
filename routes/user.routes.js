import { Router } from "express";
import {
  signupUser,
  loginUser,
  logoutUser,
  displayUser,
} from "../controllers/user.controller.js";
import upload from "../utils/multer.js";
import Blog from "../models/blog.models.js";
import { checkForLogin } from "../middleware/authentication.js";

const router = Router();

router.get("/login", (req, res) => {
  return res.render("login");
});
router.get("/signup", (req, res) => {
  return res.render("signup");
});
router.get("/:id",checkForLogin(), displayUser);
router.post("/signup",  upload.single("profileImageUrl"),signupUser);
router.post("/login", loginUser);
router.get("/2/logout", logoutUser);



export default router;
