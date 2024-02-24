import Blog from "../models/blog.models.js";
import Comment from "../models/comment.models.js";

const addBlog = async (req, res) => {
  const { title, body } = req.body;
  const blog = await Blog.create({
    title,
    body,
    coverImageUrl: `/uploads/${req.file.filename}`,
    creator: req.user._id,
  });
  return res.redirect(`/blog/${blog._id}`);
};

const handleBlogs = async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("creator");
  const comment = await Comment.find({ commentedOn: req.params.id }).populate(
    "commentedBy"
  );
  const total = comment.length;
  return res.render("blog", {
    user: req.user,
    blog: blog,
    comment: comment,
    total: total,
  });
};

const handleComment = async (req, res) => {
  const comment = await Comment.create({
    content: req.body.content,
    commentedOn: req.params.blogID,
    commentedBy: req.user._id,
  });
  return res.redirect(`/blog/${req.params.blogID}`);
};

const deleteBlog = async (req, res) => {
  console.log("hey");
  try {
    const blogId = req.params.blogID;

    const deleted = await Blog.findByIdAndDelete(blogId);
    if (deleted) {
      const blogs = await Blog.find({ creator: req.params.id })
        .sort({ createdAt: -1 })
        .populate("creator");

      return res.render("userprofile", { user: req.user, blogs });
    }

    return res.status(404).send("error!!");
  } catch (err) {
    console.error(err);
    return res.status(500).send("error!!");
  }
};

const showBlogToEdit= async(req,res)=>{
return res.render("editblog",{user:req.user})
}

export { addBlog, handleComment, handleBlogs, deleteBlog ,showBlogToEdit};
