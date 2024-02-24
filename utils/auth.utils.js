import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwtSecret = process.env.JWT_SECRET;

async function generateToken(user) {
  const token =  jwt.sign(
    { username:user.username,
      email: user.email,
      _id: user._id,
      role: user.role,
      profileImageUrl: user.profileImageUrl,
      createdAt:user.createdAt
    },
    jwtSecret,
    { expiresIn: "24h" }
  );
  return token;
}

function validateToken(token) {
  try {
    const payload = jwt.verify(token, jwtSecret);
    return payload;
  } catch (error) {
    console.error('Token validation error:', error.message);
  }
}


export{validateToken,generateToken};