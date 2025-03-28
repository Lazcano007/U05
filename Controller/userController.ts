import { Request, Response } from "express";
import { hashPassword, verifyPassword } from "../src/bcrypt";
import { userModel } from "../Model/userModel";
import jwt from "jsonwebtoken";
import type { UserRequest } from "../Middlewear/auth";

//CRUD OPERATIONER FÖR ANVÄNDARE

// Detta hämtar DATA från DB (i detta fall användare)
export const getUsers = async (req: UserRequest, res: Response) => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "The user is not found" });
      return;
    }
    res
      .status(200)
      .json({
        message: "Your profile",
        user: { id: req.user._id, name: req.user.name, email: req.user.email },
      });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "There's been an error fetching your profile" });
    return;
  }
};

// Detta uppdaterar DATA i DB (i detta fall användare)
export const getUserByEmail = async (req: Request, res: Response) => {
  try {
    const user = await userModel.findOne({ email: req.params.email });
    if (!user) {
      res.status(404).json({ message: "This user is not found" });
      return;
    }
    res.json(user);
  } catch (error: any) {
    res
      .status(500)
      .json({ message: "There's been an error fetching your profile" });
  }
};

// Detta skapar DATA i DB (i detta fall användare)
export const createUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "This user already exists" });
      return;
    }
    const hashedPassword = await hashPassword(password);
    const newUser = new userModel({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "There's been a server error" });
  }
};

// Detta loggar in användaren
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, password } = req.body;

    if (!name || !password) {
      res.status(400).json({ message: "Both name and password are required" });
      return;
    }
    const user = await userModel.findOne({ name });
    if (!user) {
      res.status(404).json({ message: "This user is not found" });
      return;
    }
    const match = await verifyPassword(password, user.password);
    if (!match) {
      res.status(401).json({ message: "This password is incorrect" });
      return;
    }
    const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET!);
    res
      .status(200)
      .json({
        message: "You are now logged in",
        token,
        user: { name: user.name, email: user.email },
      });
    return;
  } catch (error: any) {
    res.status(500).json({ message: "There's been a server error" });
  }
};

// Detta uppdaterar DATA i DB (i detta fall användaren)
export const updateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const updatedUser = await userModel.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      res.status(404).json({ message: "This account is not found" });
      return;
    }
    res.json({
      message: "Your account has been successfully updated",
      user: updatedUser,
    });
  } catch (error: any) {
    res.status(500).json({ message: "Theres been a server error" });
  }
};

// Detta tar bort DATA i DB (i detta fall användaren)
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedUser = await userModel.findByIdAndDelete(id);
    if (!deletedUser) {
      res.status(404).json({ message: "This account is not found" });
      return;
    }
    res.json({ message: "Your account has been successfully deleted" });
  } catch (error: any) {
    res.status(500).json({ message: "There's been a server error" });
  }
};

// Detta loggar ut användaren
export const logoutUser = async (req: Request, res: Response) => {
  try {
    res.status(200).json({ message: "You successfully logged out" });
  } catch (error: any) {
    res.status(500).json({ message: "You coudn't logout failed" });
  }
};
