import {Request, Response} from "express";
import Pet from "../Model/petModel";
import petModel from "../Model/petModel";

//CRUD OPERATIONER FÖR DJUR 

// Detta hämtar all DATA från DB (i detta fall djuren)

export const getUserPets =  async (req: Request, res: Response) => {
    try {
        const { id } = req.params; // parametern heter :id
        const pets = await petModel.find({ owner: id });
        if (!pets || pets.length === 0) {
          res.status(404).json({ message: "No pets found for this user" });
          return;
        }
    res.status(200).json(pets);
    } catch (error: any) {
    res.status(500).json({message: "There's been an error getting your pets", error: error.message});
    }
};

// Detta hämtar en specifikt DATA från DB (i detta fall djuren baserat på ID)
export const getPetById = async (req: Request, res: Response) => {
    try{
        const pet = await petModel.findById(req.params.id);
    if(!pet) { 
        res.status(404).json({ message: "This pet is not found"});
        return;
        }
    res.json(pet);
    } catch (error:any) {
        res.status(500).json({message: error.message});
    } 
}

// Detta lägger till DATA i DB (i detta fall djuren)
export const createPet = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, species, breed, age, owner } = req.body;
        if (!name || !species || !breed || age === undefined || !owner) {
        res.status(400).json({ message: "Name, species, breed, age and owner are required." });
        return;
    }
      const newPet = new Pet({name: req.body.name, species: req.body.species, breed: req.body.breed, age: req.body.age, owner: req.body.owner});
      await newPet.save();
    res.status(201).json(newPet);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

// Detta uppdaterar DATA i DB (i detta fall djuren)
export const updatePet = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const updatedPet = await petModel.findByIdAndUpdate( id, req.body, {new: true});  
        if (!updatedPet) {                                                                                           
        res.status(404).json({message: "This pet is not found"});    
        return;
    }
    res.json({message: "Your pet has been successfully updated", pet: updatedPet});
    } catch (error:any) {
        res.status(500).json({message: error.message || "There's been a server error"})
    }
}



// Detta tar bort DATA i DB (i detta fall djuren)
export const deletePet = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const deletedPet = await petModel.findByIdAndDelete(id);
        if (!deletedPet) {
        res.status(404).json({message: "This pet is not found"});
        return;
    }
    res.json({ message: "Your pet has been successfully deleted" });
    } catch (error: any) {
        res.status(500).json({ message: error.message || "There's been a server error" });
    }
};