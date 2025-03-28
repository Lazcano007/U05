import mongoose, { Document } from "mongoose"; // {Document} används för att definera strukturen för dokumnetet i DB

// definerar strukturen för dokumentet i databasen
export interface PetData {
  owner: mongoose.Types.ObjectId; // Refererar till användarens _id (som man får automatisk av mongodb)
  name: string;
  species: string;
  breed: string;
  age: number;
  color?: string;
  weight?: number;
}
