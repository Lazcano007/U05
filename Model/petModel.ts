import mongoose, { Document , Schema } from "mongoose";

export interface PetData extends Document {      //Detta interface är DIREKT kopplat till DATABASEN MongoDB

    id: number;
    userID: number;
    name : string;
    species : string;
    breed: string;
    age: number;
    color?: string;
    weight?: number;
}

const PetSchema = new Schema({                //Definerar strukturen för dokumnetet i DB

    id: {type: Number, required: true},       //Definerar vad som kävs för att skapa ett husdjursdokument, "required" är obligatiriskt
    userID: {type: Number, required: true},
    name: {type: String, required: true},
    species: {type: String, required: true},
    breed: {type: String, required: true},
    age: {type: Number, required: true},
    color: { type: String },
    weight: { type: Number },  
});

const Pets = mongoose.model<PetData>("Pet", PetSchema);    //Skapar en doell som kopplar till MongoDB-collection. "Pet" är namnet på collectionen

export default Pets;