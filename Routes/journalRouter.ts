import express from "express";
import { createJournal, deleteJournal, getJournalsForPet, getJournals, updateJournal } from "../Controller/journalController";


const journalRouter = express.Router();

// journalRouter.get("/", getJournals)

journalRouter.get("/pet/:petId", getJournalsForPet);
journalRouter.post("/create", createJournal)
journalRouter.put("/update/:id", updateJournal)
journalRouter.delete("/delete/:id", deleteJournal)


export default journalRouter;