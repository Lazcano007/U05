import mongoose, { Document } from "mongoose"; // {Document} används för att definera strukturen för dokumnetet i DB

// definerar strukturen för dokumentet i databasen
export interface AppointmentData {
  petId: mongoose.Types.ObjectId; // Referens till husdjurets _id
  userId: mongoose.Types.ObjectId; // Referens till användarens _id (den som bokade)
  date: Date;
  time: Number;
  description: String;
}
