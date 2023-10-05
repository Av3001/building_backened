import {Router} from "express";
import authRoutes from "./auth.routes.js";
import couponRoutes from "./coupon.route.js"
import collectionRoutes from "./coupon.route.js"

const router=Router()
router.use("/auth",authRoutes)
router.use("/coupon",couponRoutes)
router.use("/collection",collectionRoutes)


export default router