import asyncHandler from "../service/asyncHandler";
import CustomError from "../utils/CustomError";
import User from "../models/user.schema.js"

export const cookieOptions={
    expires:new Date(Date.now()+3*24*3600*1000),
    httpOnly:true
}

export const signup=asyncHandler(async(req,res)=>{
    //get data from user
    const {name,email,password}=req.body

    //validation
    if (!name || !email || !password){
        throw new CustomError("Please add all fields",400)
    }

    //let add this data to database
    //check if user already exists
    const existingUser=await User.findOne({email})
    if(existingUser){
        throw new CustomError("User already exists",400)
    }

    const user=awaitUser.create({
        name,
        email,
        password
    })
    const token=user.getJWTtoken()

    //safety
    user.password=undefined
    //store this token in user's cookie
    res.cookie("tooken",token)

    //send back aresponse to user
    res.status(200).json({
        success:true,
        token,
        user,
    })
})