import express from "express";
import authenticateToken from "../Middlewear/auth"; //importing middlewear
import {
  createUser,
  getUsers,
  loginUser,
  logoutUser,
  filterUser,
} from "../Controller/userController"; // Kontrollera denna sökväg!
const userRouter = express.Router();

userRouter.post("/registration", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/filter", filterUser);
userRouter.get("/", getUsers);
userRouter.post("/logout", authenticateToken, logoutUser);
export default userRouter;
