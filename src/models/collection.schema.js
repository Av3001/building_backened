import mongoose from "mongoose";

const collectionSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:["true","Please provide a collection name"],
            trim:true,
            maxLength:[
                120,
                "Collection name shoul not be more than 120 chars"
            ]
        }
        
    },
    {timestamps : true}
);

export default mongoose.model("Collection",collectionSchema)