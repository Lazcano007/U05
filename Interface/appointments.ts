import { Document } from "mongoose";  // {Document} används för att definera strukturen för dokumnetet i DB

// definerar strukturen för dokumentet i databasen
export interface AppointmentData{
    id: number;
    date: Date;
    time: number,
    description: string;
}
