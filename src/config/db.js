// src/config/db.js
import mongoose from "mongoose";
import { config } from "./config.js";

const connectDB = async () => {
    try {
        await mongoose.connect(config.connectionString);
        console.log("----Database Connected Successfully----");

    } catch (err) {
        
        console.error("Failed to connect to the database:", err);
        throw err;  // Re-throw the error to be caught in startServer
    }
};

export default connectDB;
