import { Router } from "express";
import {
  addBlog,
  changeCoverImage,
  deleteBlog,
  handleBlogs,
  handleComment,
  handleEditBlog,
} from "../controllers/blog.controller.js";
import Blog from "../models/blog.models.js";
import upload from "../utils/multer.js";

const router = Router();

router.get("/add", async (req, res) => {
  return res.render("addblog", { user: req.user });
});

router.post("/add", upload.single("coverImageUrl"), addBlog);

router.get("/:id", handleBlogs);

router.post("/comment/:blogID", handleComment);

router.delete("/delete/:blogID", deleteBlog);

router.get("/edit/:blogId", async (req, res) => {
  const blog = await Blog.findById(req.params.blogId);
  return res.render("editblog", { user: req.user, blog });
});

router.post("/edit/:blogId", handleEditBlog);

router.post(
  "/coverImage/:blogId",
  upload.single("coverImageUrl"),
  changeCoverImage
);

export default router;
