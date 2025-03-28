import mongoose, { Schema } from "mongoose";
import { AppointmentData } from "../Interface/appointments";

const AppointmentSchema = new Schema({                //Definerar strukturen för dokumnetet i DB
    petId: { type: Schema.Types.ObjectId, ref: "Pet", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    date: {type: Date, required: true},
    time: {type: Number, required: true},
    description: {type: String, required: true}
});

const Appointments = mongoose.model<AppointmentData>("Appointment", AppointmentSchema);    //Skapar en doell som kopplar till MongoDB-collection. "Appointment" är namnet på collectionen

export default Appointments;