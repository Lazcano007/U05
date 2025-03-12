import {Request, Response} from "express";
import { PetData } from "../Interface/pets";
import Pets from "../Model/petModel";

//DUMMY DATA
//Denna data används för att testa CRUD operationer innan vi kopplar till databasen
let pets: PetData[] = [
    {id: 1, userID: 1, name:"Balboa", species: "Dog", breed: "miniature-pinscher", age: 11},
    {id: 2, userID: 2, name:"Bandida", species: "Dog", breed: "staffordshire bullterrier", age: 2}
];




//CRUD OPERATIONER FÖR DJUR 

// Detta hämtar all DATA från DB (i detta fall djuren)
export const getPets = async (req: Request, res: Response) => {
    try {
        res.json(pets);
    } catch(error: any) {
        res.status(400).json({error: error.message});
    }
    
}

// Detta hämtar en specifikt DATA från DB (i detta fall djuren baserat på ID)
export const getPetById = (req: Request, res: Response) => {
    const pet = pets.find((nextpets) => nextpets.id === parseInt(req.params.id));
    if(!pet) {
        res.status(404).json({ message: "This pet is not found"});
        return;
    }
    res.json(pet);
}

// Detta lägger till DATA i DB (i detta fall djuren)
export const addPet = (req: Request, res: Response) => {
    const newPet: PetData = {
        id: pets.length + 1,    // unikt id för djuret i DB
        userID: req.body.userID,   //unik id för användare 
        name: req.body.name || "Unknown",
        species: req.body.species || "Unknown",
        breed: req.body.breed || "Unknown",
        age: req.body.age || 0,
    }
    pets.push(newPet);
    res.status(201).json(newPet);
}

// Detta uppdaterar DATA i DB (i detta fall djuren)
export const updatePet = (req: Request, res: Response) => {
    const petIndex = pets.findIndex (p => p.id === parseInt(req.params.id));    //(req.param.id) =hämtar index för djuret som ska uppdateras
    if(petIndex === -1) {                                                       //parseInt(req.params.id) omvandlar id frånstring till int                                           
    res.status(404).json({message: "This pet is not found"});    
    return;
    }
    pets[petIndex] = { ...pets[petIndex], ...req.body};            // (...) = uppdaterar djuret utan att skriva över hela objektet
    res.json({message: "Your pet has been successfully updated", pet: pets[petIndex]});   //(pet: pets[petIndex) = visar vilket djur som uppdaterats
}

// Detta tar bort DATA i DB (i detta fall djuren)
export const deletePet = (req: Request, res: Response) => {
    const petIndex = pets.findIndex(p=> p.id === parseInt(req.params.id));
    if (petIndex === -1) {
        res.status(404).json({message: "This pet is not found"});
        return;
    }
    pets.splice(petIndex, 1);  //splice tar bort ett element från arrayen
    res.json({message: "Your pet has been successfully deleted"})
}