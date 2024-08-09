import Blog from "../models/blog.models.js";
import Comment from "../models/comment.models.js";
import cloudinary from "../utils/cloudinary.js";

const addBlog = async (req, res) => {
  const { title, body } = req.body;

  try {
    let coverImageUrl = "/images/default.jpg";
    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "blogs",
        });
        coverImageUrl = result.secure_url;
      } catch (cloudinaryError) {
        console.error("Error uploading image to Cloudinary:", cloudinaryError);
        return res.status(500).send("Error uploading cover image");
      }
    }

    const blog = await Blog.create({
      title,
      body,
      coverImageUrl,
      creator: req.user._id,
    });

    return res.redirect(`/blog/${blog._id}`);
  } catch (error) {
    console.error("Error creating blog:", error);
    return res.status(500).send("Error creating blog");
  }
};

const handleBlogs = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("creator");
    if (!blog) {
      return res.status(404).send("Blog not found");
    }

    const comments = await Comment.find({
      commentedOn: req.params.id,
    }).populate("commentedBy");
    const total = comments.length;

    return res.render("blog", {
      user: req.user,
      blog: blog,
      comments: comments,
      total: total,
    });
  } catch (error) {
    console.error("Error handling blog:", error);
    return res.status(500).send("Internal Server Error");
  }
};

const handleComment = async (req, res) => {
  try {
    await Comment.create({
      content: req.body.content,
      commentedOn: req.params.blogID,
      commentedBy: req.user._id,
    });

    return res.redirect(`/blog/${req.params.blogID}`);
  } catch (error) {
    console.error("Error creating comment:", error);
    return res.status(500).send("Internal Server Error");
  }
};

const deleteBlog = async (req, res) => {
  try {
    const blogId = req.params.blogID;

    const deleted = await Blog.findByIdAndDelete(blogId);
    if (!deleted) {
      return res.status(404).send("Blog not found");
    }

    const blogs = await Blog.find({ creator: req.params.id })
      .sort({ createdAt: -1 })
      .populate("creator");

    return res.render("userprofile", { user: req.user, blogs });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return res.status(500).send("Internal Server Error");
  }
};

const handleEditBlog = async (req, res) => {
  const { title, body } = req.body;
  const newdata = { title, body };

  try {
    const updatedBlog = await Blog.findOneAndUpdate(
      { _id: req.params.blogId },
      newdata,
      { new: true }
    );

    if (updatedBlog) {
      return res.redirect(`/user/${req.user._id}`);
    } else {
      return res.status(404).send("Blog not found");
    }
  } catch (error) {
    console.error("Error updating blog:", error);
    return res.status(500).send("Internal Server Error");
  }
};

const changeCoverImage = async (req, res) => {
  try {
    let coverImageUrl = "/images/default.jpg";
    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "blogs",
        });
        coverImageUrl = result.secure_url;
      } catch (cloudinaryError) {
        console.error("Error uploading image to Cloudinary:", cloudinaryError);
        return res.status(500).send("Error uploading cover image");
      }
    }

    const updatedBlog = await Blog.findOneAndUpdate(
      { _id: req.params.blogId },
      { coverImageUrl },
      { new: true }
    );

    if (updatedBlog) {
      return res.redirect(`/blog/edit/${req.params.blogId}`);
    } else {
      return res.status(404).send("Blog not found");
    }
  } catch (error) {
    console.error("Error updating cover image:", error);
    return res.status(500).send("Internal Server Error");
  }
};

export {
  addBlog,
  handleComment,
  handleBlogs,
  deleteBlog,
  handleEditBlog,
  changeCoverImage,
};
