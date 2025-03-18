import {Request, Response} from "express";
import Vaccins from "../Model/vaccinModel";
import mongoose from "mongoose";


//CRUD OPERATIONER FÖR DJUR 

// Detta hämtar all DATA från DB (i detta fall djuren)
export const getVaccinsForPet = async (req: Request, res: Response): Promise<void> => {
    try {
      const { petId } = req.params;
      const objectPetId = new mongoose.Types.ObjectId(petId); 
      const vaccins = await Vaccins.find({ pet: objectPetId });
      
      if (!vaccins || vaccins.length === 0) {
        res.status(404).json({ message: "No vaccins found for this pet" });
        return;
      }
      res.status(200).json(vaccins);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

  export const getVaccinById = async (req: Request, res: Response): Promise<void> => {
    try {
      const vaccin = await Vaccins.findById(req.params.id);
      if (!vaccin) {
        res.status(404).json({ message: "Vaccin not found" });
        return;
      }
      res.status(200).json(vaccin);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "There's been a server error" });
    }
  };
  
// Detta tar bort DATA i DB (i detta fall djuren)
export const createVaccin = async (req: Request, res: Response): Promise<void> => {
    try {
      const { petId, name, date, description } = req.body;
      if (!petId || !name || !date || !description) {
        res.status(400).json({
        message: "PetId, name, date, and description are required."});
      return;
      }
      const objectPetId = new mongoose.Types.ObjectId(petId);
      const newVaccin = new Vaccins({ pet: objectPetId, name, date, description });
      await newVaccin.save();
      res.status(201).json(newVaccin);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "There's been a server error"});
    }
  };


  export const updateVaccinForPet = async (req: Request, res: Response): Promise<void> => {
    try {
      const { petId, vaccinId } = req.params;  

      const objectPetId = new mongoose.Types.ObjectId(petId);
      const objectVaccinId = new mongoose.Types.ObjectId(vaccinId);
      
      const updatedVaccin = await Vaccins.findOneAndUpdate({ _id: objectVaccinId, pet: objectPetId   }, req.body,  { new: true });
      if (!updatedVaccin) {
        res.status(404).json({ message: "No vaccin found for this pet" });
        return;
      }
      res.json({message: "The vaccin has been successfully updated", vaccine: updatedVaccin});
    } catch (error: any) {
      res.status(500).json({ message: error.message || "There's been a server error"});
    }
  };

  // Detta tar bort DATA i DB (i detta fall vacciner)
 export const deleteVaccinFromJournal = async (req: Request, res: Response): Promise<void> => {
    try {
      const { petId, vaccinId } = req.params;
      const objectPetId = new mongoose.Types.ObjectId(petId);
      const objectVaccinId = new mongoose.Types.ObjectId(vaccinId);
      const deletedVaccin = await Vaccins.findOneAndDelete({ _id: objectVaccinId, pet: objectPetId });
      if (!deletedVaccin) {
        res.status(404).json({ message: "This vaccin for the specified pet is not found" });
        return;
      }
      res.json({message: "The vaccin has been successfully removed from the pet's journal",vaccin: deletedVaccin,});
    } catch (error: any) {
      res.status(500).json({ message: error.message || "There's been a server error"});
    }
};