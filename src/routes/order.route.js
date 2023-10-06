import {Router} from "express";
import {generateOrder,generateRazorpayOrderid,getAllOrders,getMyOrders,updateOrderStatus } from "../controllers/order.controller.js"
import {isLoggedIn,authorize} from "../middlewares/auth.middleware.js";
import AuthRoles from "../utils/authRoles.js"

const router=Router()


export default router