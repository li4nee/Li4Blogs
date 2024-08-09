import { User } from "../models/user.models.js";
import Blog from "../models/blog.models.js";
import { generateToken, validateToken } from "../utils/auth.utils.js";
import bcrypt from "bcryptjs";
import cloudinary from "../utils/cloudinary.js";

const signupUser = async (req, res) => {
  try {
    const { email, password, username } = req.body;
    let profileImageUrl = "/images/default.jpg";

    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "profiles",
        });
        profileImageUrl = result.secure_url;
      } catch (cloudinaryError) {
        console.error("Error uploading profile image to Cloudinary:", cloudinaryError);
        return res.status(500).render("signup", { error: "Error uploading profile image" });
      }
    }

    await User.create({
      username,
      password,
      email,
      profileImageUrl,
    });

    return res.redirect("/user/login");
  } catch (error) {
    console.error("Error signing up user:", error);
    return res.render("signup", { error: "Error signing up user" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.checkLoginAndGenerateToken(email, password);
    res.cookie("token", token).redirect("/");
  } catch (error) {
    console.error("Error logging in user:", error);
    res.render("login", { error: "Email or password incorrect !!" });
  }
};

const logoutUser = async (req, res) => {
  try {
    return res.clearCookie("token").redirect(`/`);
  } catch (error) {
    console.error("Error logging out user:", error);
    return res.status(500).send("Internal Server Error");
  }
};

const displayUser = async (req, res) => {
  try {
    const blogs = await Blog.find({ creator: req.params.id })
      .sort({ createdAt: -1 })
      .populate("creator");
    const bloguser = await User.findById(req.params.id);
    return res.render("userprofile", { user: req.user, bloguser, blogs });
  } catch (error) {
    console.error("Error displaying user profile:", error);
    return res.status(500).send("Internal Server Error");
  }
};

const changeProfileImage = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "profiles",
    });

    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      { profileImageUrl: result.secure_url },
      { new: true }
    );

    if (updatedUser) {
      return res.render("edituser", { user: updatedUser });
    } else {
      return res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error updating profile image:", error);
    return res.status(500).send("Internal Server Error");
  }
};

const handleEdit = async (req, res) => {
  const { username, email } = req.body;

  try {
    if (email !== req.user.email) {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.render("edituser", { error: "User already exists" });
      }

      const newdata = {
        username,
        email,
      };

      const updatedUser = await User.findOneAndUpdate(
        { _id: req.user._id },
        newdata,
        { new: true }
      );

      if (updatedUser) {
        const newToken = await generateToken(updatedUser);
        res.cookie("token", newToken);
        const payloadUser = validateToken(newToken);
        req.user = payloadUser;

        return res.redirect(`/user/${req.user._id}`);
      } else {
        return res.status(404).send("User not found");
      }
    } else {
      const newdata = {
        username,
      };

      const updatedUser = await User.findOneAndUpdate(
        { _id: req.user._id },
        newdata,
        { new: true }
      );

      if (updatedUser) {
        const newToken = await generateToken(updatedUser);
        res.cookie("token", newToken);
        const payloadUser = validateToken(newToken);
        req.user = payloadUser;
        return res.redirect(`/user/${req.user._id}`);
      } else {
        return res.status(404).send("User not found");
      }
    }
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).send("Internal Server Error");
  }
};

const changePassword = async (req, res) => {
  const { email, password, newpassword } = req.body;
  try {
    if (email !== req.user.email) {
      return res.render("changePassword", {
        user: req.user,
        error: "Incorrect Email Address",
      });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.render("changePassword", { user: req.user, error: "User not found" });
    }

    const emailPasswordCorrect = await bcrypt.compare(password, user.password);
    if (emailPasswordCorrect) {
      await User.findOneAndUpdate(
        { _id: user._id },
        { password: await bcrypt.hash(newpassword, 10) },
        { new: true }
      );

      return res.redirect(`/user/${req.user._id}`);
    } else {
      return res.render("changePassword", {
        user: req.user,
        error: "Enter correct password",
      });
    }
  } catch (error) {
    console.error("Error changing password:", error);
    return res.status(500).send("Internal Server Error");
  }
};

export {
  signupUser,
  loginUser,
  logoutUser,
  displayUser,
  changeProfileImage,
  handleEdit,
  changePassword,
};
