import mongoose from "mongoose";

async function connectDB() {
    try{
        const URL = process.env.MONGO_URL || "";
        await mongoose.connect(URL);
        console.log("Database connected successfully");
    }catch(error:unknown){
        if (error instanceof Error) {
            console.log(`Theres been an error while connecting to DB:${error.message}`);
        }
    }
}

export default connectDB;