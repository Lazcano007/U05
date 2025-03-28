import { Document } from "mongoose"; // {Document} används för att definera strukturen för dokumnetet i DB

// definerar strukturen för dokumentet i databasen
export interface UserData {
  save: any;
  name: string;
  email: string;
  password: string;
}
