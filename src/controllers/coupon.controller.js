import asyncHandler from "../service/asyncHandler.js"
import Coupon from "../models/coupon.schema.js"
import CustomError from "../utils/CustomError.js"
export const createCoupon=asyncHandler(async (req,res)=>{
    const {code,discount}=req.body

    if(!code || !discount){
        throw new CustomError("Code and discount are required",400)
    }
    const coupon=await Coupon.create({
        code,
        discount
    })

    res.status(200).json({
        success:true,
        message:"Coupon created successfully",  
        coupon
    })

})

export const getAllCoupons=asyncHandler(async (req,res)=>{
    const allCoupons=await Coupon.find();

    if(!allCoupons){
        throw new CustomError("No Coupons found",400)
    }
    res.status(200).json({
        success:true,
        allCoupons
    })
})