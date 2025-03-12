import mongoose, { Document , Schema } from "mongoose";

export interface VaccinData extends Document {      //Detta interface är DIREKT kopplat till DATABASEN MongoDB
    name: string;
    date: Date,
    description: string;
}

const VaccinSchema = new Schema({                //Definerar strukturen för dokumnetet i DB
    name: {type: String, required: true},
    date: {type: Date, required: true},
    description: {type: String, required: true}
});

const Vaccins = mongoose.model<VaccinData>("Vaccin", VaccinSchema);    //Skapar en doell som kopplar till MongoDB-collection. "Vaccin" är namnet på collectionen

export default Vaccins;