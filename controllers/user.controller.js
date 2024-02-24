import { User } from "../models/user.models.js";
import Blog from "../models/blog.models.js";
const signupUser = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    await User.create({
      username,
      password,
      email,
      profileImageUrl: `/uploads/${req.file.filename}`,
    });
    return res.redirect("/user/login");
  } catch (error) {
    return res.render("signup", { error: "Email already exists" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.checkLoginAndGenerateToken(email, password);
    res.cookie("token", token).redirect("/");
  } catch (error) {
    res.render("login",{error:"Email or password incorrect !!"})
  }
};


const logoutUser = async (req, res) => {
  return res.clearCookie("token").redirect(`/`);
};

const displayUser = async (req, res) => {
  const blogs = await Blog.find({ creator: req.params.id })
    .sort({ createdAt: -1 })
    .populate("creator");
  const bloguser= await User.findById(req.params.id);
  return res.render("userprofile", {user:req.user, bloguser, blogs });
};
export { signupUser, loginUser, logoutUser, displayUser };
