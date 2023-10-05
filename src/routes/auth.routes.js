import {Router} from "express";
import {signUp,login, getProfile, logout, forgotPassword,resetPassword} from "../controllers/auth.controller.js"
import {isLoggedIn} from "../middlewares/auth.middleware.js"


const router=Router()

router.post("/signup",signUp)
router.post("/login",login)
router.get("/logout",logout)
router.post("/password/forgot/",forgotPassword)
router.post("/password/reset/:token",resetPassword)
router.post("/profile",isLoggedIn,getProfile)

export default router;
 