import { Router } from "express";
import { addBlog, deleteBlog, handleBlogs, handleComment,showBlogToEdit } from "../controllers/blog.controller.js";

import upload from "../utils/multer.js";

const router = Router();

router.get("/add", async (req, res) => {
  return res.render("addblog", { user: req.user });
});

router.post("/add", upload.single("coverImageUrl"), addBlog);

router.get("/:id", handleBlogs);

router.post("/comment/:blogID",handleComment)

router.delete("/delete/:blogID",deleteBlog)

router.get("/edit/:userId/:blogId",showBlogToEdit)

export default router;
