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
    return res.status(500).send("error!!");
  }
};

const handleEditBlog = async (req, res) => {
  const { title, body } = req.body;
  const newdata = {
    title,
    body
  };
  try {
    const updatedBlog = await Blog.findOneAndUpdate({_id:req.params.blogId}, newdata, { new: true });

    if (updatedBlog) {
      return res.redirect(`/user/${req.user._id}`);
    } 
  } catch (error) {
    console.error('Error updating blog:', error);
    return res.status(500).send("Internal Server Error");
  }
};

const changeCoverImage= async(req,res)=>{
  try {
    const updatedBlog = await Blog.findOneAndUpdate({_id:req.params.blogId},{coverImageUrl: `/uploads/${req.file.filename}`}, { new: true });

    if (updatedBlog) {
      return res.redirect(`/blog/edit/${req.params.blogId}`);
    } 
  } catch (error) {
    console.error('Error updating blog:', error);
    return res.status(500).send("Internal Server Error");
  }
};

export { addBlog, handleComment, handleBlogs, deleteBlog ,handleEditBlog,changeCoverImage};
