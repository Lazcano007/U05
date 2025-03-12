import mongoose, { Document , Schema } from "mongoose";

export interface AppointmentData extends Document {      //Detta interface är DIREKT kopplat till DATABASEN MongoDB
    id: number;
    date: Date;
    time: Number,
    description: String;
}

const AppointmentSchema = new Schema({                //Definerar strukturen för dokumnetet i DB
    id: {type: Number, required: true},       //Definerar vad som kävs för att skapa ett husdjursdokument, "required" är obligatiriskt
    date: {type: Date, required: true},
    time: {type: Number, required: true},
    description: {type: String, required: true}
});

const Appointments = mongoose.model<AppointmentData>("Appointment", AppointmentSchema);    //Skapar en doell som kopplar till MongoDB-collection. "Appointment" är namnet på collectionen

export default Appointments;