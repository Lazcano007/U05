import mongoose, { Schema } from "mongoose";
import {VaccinData} from "../Interface/vaccins";
/* export interface VaccinData extends Document {      //Detta interface är DIREKT kopplat till DATABASEN MongoDB
    // id: number;
    name: string;
    date: Date,
    description: string;
} */

const VaccinSchema = new Schema({                //Definerar strukturen för dokumnetet i DB
    pet: { type: Schema.Types.ObjectId, ref: "Pet", required: true },
    name: {type: String, required: true},
    date: {type: Date, required: true},
    description: {type: String, required: true}
});

const Vaccins = mongoose.model<VaccinData>("Vaccin", VaccinSchema);    //Skapar en doell som kopplar till MongoDB-collection. "Vaccin" är namnet på collectionen

export default Vaccins;
