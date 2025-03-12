import express from "express";
import {getPets} from "../Controller/petController";

const router = express.Router();

router.get("/", getPets);