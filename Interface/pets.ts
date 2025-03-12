import { Document } from "mongoose";  // {Document} används för att definera strukturen för dokumnetet i DB

// definerar strukturen för dokumentet i databasen
export interface PetData{
    id: number;
    userID: number;
    name : string;
    species : string;
    breed: string;
    age: number;
    color?: string;
    weight?: number;
}

