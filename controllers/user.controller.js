import { User } from "../models/user.models.js";
import Blog from "../models/blog.models.js";
import { generateToken, validateToken } from "../utils/auth.utils.js";
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

const changeProfileImage= async(req,res)=>{
  try {
    const updateduser = await User.findOneAndUpdate({_id:req.user._id},{profileImageUrl: `/uploads/${req.file.filename}`}, { new: true });

    if (updateduser) {

      return res.render(`edituser`,{user:updateduser});
    } 
  } catch (error) {
    console.error('Error updating blog:', error);
    return res.status(500).send("Internal Server Error");
  }
}
const handleEdit = async (req, res) => {
  const { username, email } = req.body;

  try {
    if (email !== req.user.email) {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.render('edituser', { error: 'User already exists' });
      }

      const newdata = {
        username,
        email
      };

      const updatedUser = await User.findOneAndUpdate(
        { _id: req.user._id },
        newdata,
        { new: true }
      );

      if (updatedUser) {
        const newToken = await generateToken(updatedUser);
        res.cookie('token', newToken);
        const payloadUser = validateToken(newToken);
        req.user = payloadUser;

        return res.redirect(`/user/${req.user._id}`);
      }
    } else {
      const newdata = {
        username
      };

      const updatedUser = await User.findOneAndUpdate(
        { _id: req.user._id },
        newdata,
        { new: true }
      );

      if (updatedUser) {
        const newToken = await generateToken(updatedUser);
        res.cookie('token', newToken);
        const payloadUser = validateToken(newToken);
        req.user = payloadUser;
        return res.redirect(`/user/${req.user._id}`);
      }
    }
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).send('Internal Server Error');
  }
};


const changePassword=async(req,res)=>{

}

export { signupUser, loginUser, logoutUser, displayUser,changeProfileImage ,handleEdit,changePassword};
