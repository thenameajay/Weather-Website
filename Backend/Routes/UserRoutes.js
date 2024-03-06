const express=require("express")
const router=express.Router()
const controller=require("../Controllers/UserControllers")

router.post('/register',controller.addUser)
router.post('/register/otp-verification',controller.verifyOtp)
router.post('/login',controller.login)
router.post('/unsubscribe-us',controller.unsubscribe)

module.exports=router