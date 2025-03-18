import express from "express";
import { createUser, getUsers, loginUser, logoutUser} from "../Controller/userController"; // Kontrollera denna sökväg!
const userRouter = express.Router();

userRouter.post("/registration", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/", getUsers);
userRouter.post("/logout", logoutUser);
export default userRouter;