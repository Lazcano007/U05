"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePet = exports.updatePet = exports.addPet = exports.getPetById = exports.getPet = void 0;
let pets = [
    { id: 1, userID: 1, name: "Balboa", species: "Dog", breed: "miniature-pinscher", age: 11 },
    { id: 2, userID: 2, name: "Bandida", species: "Dog", breed: "staffordshire bullterrier", age: 2 }
];
//CRUD OPERATIONER!!!!!!
// ANVÄNDARE OPERATINOEN
//  DJUR OPERATIONER
// Detta hämtar all DATA från DB (i detta fall djuren)
const getPet = (req, res) => {
    res.json(pets);
};
exports.getPet = getPet;
// Detta hämtar en specifikt DATA från DB (i detta fall djuren baserat på ID)
const getPetById = (req, res) => {
    const pet = pets.find((nextpets) => nextpets.id === parseInt(req.params.id));
    if (!pet) {
        res.status(404).json({ message: "This pet is not found" });
        return;
    }
    res.json(pet);
};
exports.getPetById = getPetById;
// Detta lägger till DATA i DB (i detta fall djuren)
const addPet = (req, res) => {
    const newPet = {
        id: pets.length + 1, // unikt id för djuret i DB
        userID: req.body.userID, //unik id för användare 
        name: req.body.name || "Unknown",
        species: req.body.species || "Unknown",
        breed: req.body.breed || "Unknown",
        age: req.body.age || 0,
    };
    pets.push(newPet);
    res.status(201).json(newPet);
};
exports.addPet = addPet;
// Detta uppdaterar DATA i DB (i detta fall djuren
const updatePet = (req, res) => {
    const petIndex = pets.findIndex(p => p.id === parseInt(req.params.id)); //(req.param.id) =hämtar index för djuret som ska uppdateras
    if (petIndex === -1) { //parseInt(req.params.id) omvandlar id frånstring till int                                           
        res.status(404).json({ message: "This pet is not found" });
        return;
    }
    pets[petIndex] = Object.assign(Object.assign({}, pets[petIndex]), req.body); // (...) = uppdaterar djuret utan att skriva över hela objektet
    res.json({ message: "Your pet has been successfully updated", pet: pets[petIndex] }); //(pet: pets[petIndex) = visar vilket djur som uppdaterats
};
exports.updatePet = updatePet;
// Detta tar bort DATA i DB (i detta fall djuren)
const deletePet = (req, res) => {
    const petIndex = pets.findIndex(p => p.id === parseInt(req.params.id));
    if (petIndex === -1) {
        res.status(404).json({ message: "This pet is not found" });
        return;
    }
    pets.splice(petIndex, 1); //splice tar bort ett element från arrayen
    res.json({ message: "Your pet has been successfully deleted" });
};
exports.deletePet = deletePet;
