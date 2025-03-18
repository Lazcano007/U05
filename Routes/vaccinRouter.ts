import express from "express";
import { createVaccin, deleteVaccinFromJournal, getVaccinById, getVaccinsForPet, updateVaccinForPet } from "../Controller/vaccinController";


const vaccinRouter = express.Router();


vaccinRouter.get("/pet/:petId", getVaccinsForPet);
vaccinRouter.get("/:id", getVaccinById);
vaccinRouter.post("/create", createVaccin);
vaccinRouter.put("/pets/:petId/vaccins/:vaccinId", updateVaccinForPet);
vaccinRouter.delete("/pets/:petId/vaccins/:vaccinId", deleteVaccinFromJournal);

export default vaccinRouter;