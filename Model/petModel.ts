import mongoose, { Schema } from "mongoose";
import {PetData} from "../Interface/pets";

// export interface PetData extends Document {      //Detta interface är DIREKT kopplat till DATABASEN MongoDB
//     owner: mongoose.Types.ObjectId;            // Refererar till användarens _id (som man får automatisk av mongodb)
//     name : string;
//     species : string;
//     breed: string;
//     age: number;
//     color?: string;
//     weight?: number;
// }

const PetSchema = new Schema({                 //Definerar strukturen för dokumnetet i DB
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true},     // Refererar till den Mongoose-modell som heter "User"   // Om du vill att varje husdjur måste ha en ägare
    vaccinations: [{ type: Schema.Types.ObjectId, ref: "Vaccination" }],
    name: {type: String, required: true},
    species: {type: String, required: true},
    breed: {type: String, required: true},
    age: {type: Number, required: true},
    color: { type: String },
    weight: { type: Number },
   
});

const Pets = mongoose.model<PetData>("Pet", PetSchema);    //Skapar en domell som kopplar till MongoDB-collection. "Pet" är namnet på collectionen

export default Pets;