import { Router } from "express";
import {
  signupUser,
  loginUser,
  logoutUser,
  displayUser,
  changeProfileImage,
  handleEdit,
  changePassword,
} from "../controllers/user.controller.js";
import upload from "../utils/multer.js";
import Blog from "../models/blog.models.js";
import { checkForLogin } from "../middleware/authentication.js";
import { User } from "../models/user.models.js";

const router = Router();

router.get("/login", (req, res) => {
  return res.render("login");
});
router.get("/signup", (req, res) => {
  return res.render("signup");
});
router.get("/:id", checkForLogin(), displayUser);
router.post("/signup", upload.single("profileImageUrl"), signupUser);
router.post("/login", loginUser);
router.get("/2/logout", logoutUser);

router.get("/2/editDetails",  checkForLogin(),async (req, res) => {
  const user = await User.findById(req.user._id);
  return res.render("edituser", {user});
});

router.post("/2/editDetails",checkForLogin(),handleEdit);

router.post("/changeProfileImage", checkForLogin(),upload.single("profileImageUrl"),changeProfileImage)

router.post("changePassword",changePassword)

export default router;
