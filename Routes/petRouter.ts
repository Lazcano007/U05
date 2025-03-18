import express from "express";
import {createPet, deletePet, getPetById, getUserPets, updatePet} from "../Controller/petController";


const petRouter = express.Router();

petRouter.get("/user/:id", getUserPets);   //med id hämtar det just id:ets djur
petRouter.get("/getPetById/:id", getPetById);
petRouter.post("/create", createPet);
petRouter.put("/update/:id", updatePet);
petRouter.delete("/delete/:id", deletePet);

export default petRouter;