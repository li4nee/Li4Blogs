import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { generateErrorResponse } from "../utils/apierror.js";
import { generateToken } from "../utils/auth.utils.js";
const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    profileImageUrl: {
      type: String,
      default: "/images/default.jpg",
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return;
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.statics.checkLoginAndGenerateToken= async function (email, password) {
  const user = await this.findOne({ email }).select("+password");
  if (!user) throw generateErrorResponse(400, "User not found");
  const emailPasswordCorrect = await bcrypt.compare(password, user.password);

  //  user._doc.password = undefined;

  // if (emailPasswordCorrect) return { user };
  if(emailPasswordCorrect)
  {
    const token = await generateToken(user);
    return token;
  }
  else {
    throw generateErrorResponse(400, "Password is incorrect.");
  }

};

const User = mongoose.model("User", userSchema);
export { User };
