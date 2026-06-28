import jwt from "jsonwebtoken"
import { FindUserById } from "../../models/user/user.model.js";
import ApiError from "../../utils/ApiError.js";
import asyncHandler from "../../utils/asynchandler.js";

const verifyJWT = asyncHandler(async (req, res, next) => {
  try {
    // 1. Token lo (cookie ya header)
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      throw new ApiError(401, "Unauthorized: No token provided");
    }

    // 2. Token verify karo
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );

    // 3. User DB se lo
    const user = await FindUserById(decoded.id);

    if (!user) {
      throw new ApiError(401, "Invalid token: user not found");
    }

    // 4. req.user set karo
    req.user = user;

    console.log("TOKEN:", token);
console.log("DECODED:", decoded);

    next();
  } catch (error) {
    throw new ApiError(401, error.message);
  }
});

export default verifyJWT;