import {Router} from "express";
import {signUp,login, getProfile} from "../controllers/auth.controller.js"
import {isLoggedIn} from "../middlewares/auth.middleware.js"


const router=Router()

router.post("/signup",signUp)
router.post("/login",login)
router.post("/profile",isLoggedIn,getProfile)

