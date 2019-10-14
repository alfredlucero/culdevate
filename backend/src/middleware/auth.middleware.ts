import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import UsersDao from "../users/users.dao";
import { RequestWithUser } from "../interfaces/requestWithUser";
import { AuthTokenPayload } from "../interfaces/authTokenPayload";

const authMiddleware = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  // Extract JWT from Authorization: Bearer <JWT> header
  const authHeader = req.header("Authorization");
  if (!authHeader) {
    return res.status(401).json({
      message:
        "No Authorization header passed. Please try authenticating again.",
    });
  }
  const token = authHeader.replace("Bearer", "").trim();

  // Verify and decode the JWT from Authorization header
  let decodedTokenPayload;
  try {
    const jwtSecret = process.env.JWT_SECRET || "someJwtSecret";
    decodedTokenPayload = jwt.verify(token, jwtSecret) as AuthTokenPayload;
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token. Please try authenticating again.",
    });
  }

  // Verify we can find matching user by id from decoded token payload
  try {
    const { id } = decodedTokenPayload;
    const user = await UsersDao.findUserById(id);

    if (!user) {
      return res.status(401).json({
        message: "No user matched the token. Please try authenticating again.",
      });
    }

    // Pass logged in user data to authenticated routes for them to use
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({
      message:
        "Failed to determine if user matched the token. Please try authenticating again.",
    });
  }
};

export default authMiddleware;
