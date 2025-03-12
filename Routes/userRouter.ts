import express from "express";
import {getPets} from "../Controller/petController";
import { createUser, getUser } from "../Controller/userController";

const router = express.Router();

router.get("/", getPets);

router.get("/", getUser);

router.post("/registration", createUser);

export default router;