import mongoose from "mongoose";
import AuthRoles from "../utils/authRoles.js";
import bcrpyt from "bcryptjs";

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:["true","Name is required"],
        maxLength:[50,"Name must be less than 50 chars"]
    },
    email:{
         type:String,
         required:['true',"Email is required"],
    },
    password:{
        type:String,
        required:[true,"Password is required"],
        minLength:[8,"password must be at least 8 chars"],
        select:false
    },
    role:{
        type:String,
        enum:Object.values(AuthRoles),
        default:AuthRoles.USER
    },
    forgotPasswordToken:String,
    forgotPasswordExpiry:Date,
},{timestamps : true})

userSchema.pre("save",async function(next){
    if (!this.isModified("password")) return next()
    this.password=await bcrpyt.hash(this.password,10);
    next()  
})

userSchema.methods={
    comparePassword: async function(enteredPassword){
        return await bcrpyt.compare(enteredPassword,this.password)
    }
}



export default mongoose.model('User',userSchema); 