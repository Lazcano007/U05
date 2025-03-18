import mongoose, { Document } from "mongoose";  // {Document} används för att definera strukturen för dokumnetet i DB

// definerar strukturen för dokumentet i databasen
export interface JournalData{
    petId: mongoose.Types.ObjectId;                  // Refererar till husdjurets _id
    description: string;
    treatment: string;
    dateDiagnosis: Date;
    status: string;
    
}