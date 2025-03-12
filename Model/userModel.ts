import mongoose, { Document , Schema } from "mongoose";

export interface UserData extends Document {      //Detta interface är DIREKT kopplat till DATABASEN MongoDB
    name : string;
    email: string;
    password: string;
}

const UserSchema = new Schema({                //Definerar strukturen för dokumnetet i DB
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},  
});

const Users = mongoose.model<UserData>("User", UserSchema);    //Skapar en doell som kopplar till MongoDB-collection. "User" är namnet på collectionen

export default Users;