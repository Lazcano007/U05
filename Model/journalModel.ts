import mongoose, { Schema } from "mongoose";
import { JournalData } from "../Interface/journals";


const JournalSchema = new Schema({                   //Definerar strukturen för dokumnetet i DB
    petId: { type: Schema.Types.ObjectId, ref: "Pet", required: true},
    description: {type: String, required: true},
    treatment: {type: String, required: true},       //Definerar vad som kävs för att skapa ett Journaldokumentet, "required" är obligatiriskt
    dateDiagnosis: {type: Date, required: true},
    status: {type: String, required: true},
    
});

const Journals = mongoose.model<JournalData>("Journal", JournalSchema);    //Skapar en doell som kopplar till MongoDB-collection. "Journal" är namnet på collectionen

export default Journals;