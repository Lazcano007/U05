import express from "express";
import {
  createVaccin,
  deleteVaccinFromJournal,
  getVaccinById,
  getVaccinsForPet,
  updateVaccinForPet,
} from "../Controller/vaccinController";

const vaccinRouter = express.Router();

vaccinRouter.post("/create", createVaccin);
vaccinRouter.get("/pet/:petId", getVaccinsForPet);
vaccinRouter.get("/:id", getVaccinById);
vaccinRouter.put("/pets/:petId/vaccins/:vaccinId", updateVaccinForPet);
vaccinRouter.delete("/pets/:petId/vaccins/:vaccinId", deleteVaccinFromJournal);

export default vaccinRouter;
