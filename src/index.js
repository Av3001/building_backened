import mongoose from "mongoose";
import app from "./app.js";
import config from "./config/index.js";

 (async ()=>{
    try {
        await mongoose.connect(config.MONGODB_URL);
         console.log("DB Connected");

         app.on('error',(error)=>{
            console.error("Error:" ,error)
            throw error
         })
        const onListen=()=>{
            console.log("Server listening");
        }

         app.listen(config.PORT,onListen)
    } catch (error) {
        console.error("Error:" ,error)
        throw error
    }
 })()