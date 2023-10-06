import asyncHandler from "../service/asyncHandler.js"
import Coupon from "../models/coupon.schema.js"
import CustomError from "../utils/CustomError.js"
import razorpay from "../config/razorpay.config.js"
import products from "razorpay/dist/types/products.js"

export const generateRazorpayOrderid=asyncHandler(async (req,res)=>{
    const {products,couponCode}=req.body
    let totalAmount=0 
    let discountAmount=0
    const options={
        amount:Math.round(totalAmount*100),
        currency:"INR",
        receipt:`receipt_${new Date().getTime()}`
    }

    let productPriceCalc=Promise.all(
        products.map(async (product)=>{
            const {productId,count}=product;
            const productFromDB=await product.findById(productId)
            if(!productFromDB){
                throw new CustomError("No product found",400)
            }
            if(productFromDB.stock<count){
                return res.status(400).json({
                    error:"Product quantity not in stock"
                })
            }
            totalAmount+=productFromDB.price*count
        })
    )
    await productPriceCalc 

    if(!products || products.length===0){
        throw new CustomError("No product found",400)
    }
    const order=await razorpay.orders.create(options) 
    if(!order){
        throw new CustomError("No product found",400)
    }

    res.status(200).json({
        success:true,
        message:"razorpay order id generated successfully",
        order
    })
})

export const generateOrder=asyncHandler(async(req,res)=>{
    const {transactionId,products,coupon}=req.body
})
//getallorders:ADMIN",updateOrderStatus:admin,getMyorders 