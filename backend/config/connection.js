import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config();
// connection function for connecting to database 
const connectDB = async () => {
    try {

        let connection = await mongoose.connect(process.env.MONGODB_URI, { dbName: "youtube_clone" });
        if (connection) {
            console.log("connection Success")
        }
    } catch (err) {
        console.log("connection failed with error : " + err);
    }
}
// calling the cnnecton function
connectDB();