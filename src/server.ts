import express, {Express, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "../database/db";

dotenv.config();
connectDB();

const app: Express = express();
const PORT: string | number = process.env.PORT || 3636;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req: Request, res: Response) => {
    res.send("hello world");
});

app.listen(PORT,()=> {
    console.log(`Program is running on http://localhost:${PORT}`);
})