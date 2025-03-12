import { Document } from "mongoose";  // {Document} används för att definera strukturen för dokumnetet i DB

// definerar strukturen för dokumentet i databasen
export interface JournalData{
    description: string;
    treatment: string;
    dateDiagnosis: Date;
    status: string;
    
}