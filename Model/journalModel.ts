import mongoose, { Document , Schema } from "mongoose";

export interface JournalData extends Document {      //Detta interface är DIREKT kopplat till DATABASEN MongoDB
    description: string;
    treatment: string;
    dateDiagnosis: Date;
    status: string;
    
}

const JournalSchema = new Schema({                   //Definerar strukturen för dokumnetet i DB
    description: {type: String, required: true},
    treatment: {type: String, required: true},       //Definerar vad som kävs för att skapa ett Journaldokumentet, "required" är obligatiriskt
    dateDiagnosis: {type: Date, required: true},
    status: {type: String, required: true},
    
});

const Journals = mongoose.model<JournalData>("Journal", JournalSchema);    //Skapar en doell som kopplar till MongoDB-collection. "Journal" är namnet på collectionen

export default Journals;