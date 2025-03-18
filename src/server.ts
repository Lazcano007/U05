import express, {Express, Request, Response } from "express";
import dotenv from "dotenv";
import connectDB from "../database/db";
import userRouter from "../Routes/userRouter";
import petRouter from "../Routes/petRouter";
import vaccinRouter from "../Routes/vaccinRouter";
import journalRouter from "../Routes/journalRouter";
import appoinmentRouter from "../Routes/appointmentRouter";



dotenv.config();
connectDB();

const cors = require("cors");
const app: Express = express();
const PORT: string | number = process.env.PORT || 3636;

app.use(cors(
    {
    origin: "http://localhost:3100",
    methods: ["GET", "POST", "PUT", "DELETE"],
    }
));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req: Request, res: Response) => {
    res.send("Hello world");
});

app.use("/api/Users", userRouter);
app.use("/api/Pets", petRouter);
app.use("/api/Vaccins", vaccinRouter);
app.use("/api/Journals", journalRouter);
app.use("/api/Appointments", appoinmentRouter);



app.listen(PORT,()=> {
    console.log(`Program is running on http://localhost:${PORT}`);
})

