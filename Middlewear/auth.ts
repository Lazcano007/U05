import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { UserData, userModel } from "../Model/userModel";

export interface UserRequest extends Request {
  user?: UserData;
}

export const authenticateToken = (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, decoded) => {
    if (err || typeof decoded !== "object" || !("id" in decoded)) {
      res.status(403).json({ message: "This token is invalid" });
      return;
    }

    userModel
      .findById((decoded as JwtPayload).id)
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "This user not found" });
          return;
        }
        req.user = user;
        next();
      })
      .catch((error) => {
        console.error(error);
        res
          .status(500)
          .json({
            message:
              "There's been and error while fetching user from the database"
          });
      });
  });
};

export default authenticateToken;
