const userSchema = require("../Schema/user")
const otpSchema = require("../Schema/otp")
const newUserSchema = require("../Schema/newUser")
const nodemailer = require('nodemailer')
const bcrypt = require('bcrypt')
const { json } = require("body-parser")
require("dotenv").config()

// for email-------------------------------------------
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAILID,
        pass: process.env.APP_PASSWORD,
    },
})
// --------------------------------------------------------


exports.addUser = (req, res) => {
    let encrptPassword
    const { name, email, password, lat, lon } = req.body

    userSchema.find({ email: email }).then((rslt) => {
        if (rslt.length == 0) {
            const otp = Math.floor(Math.random() * 1000000).toString()

            transporter.sendMail({
                from: `"Weathering"<${process.env.EMAILID}>`,
                to: email,
                subject: "OTP verification",
                text: "OTP mail",
                html: `
                <div style="background-color:white">
                    <h2 style="color:black">Hello ${name} </h2>
                    Your OTP for registering to Weathering is ${otp} .
                    <br/>
                    Please ignore if it not belongs to you and never share otp with anyone.
                    <br/>
                    Thank You for Registering.
                    <br/>
                    Team Weathering
                </div>
                `

            }).then((r0) => {
                console.log("otp sent")
                res.status(200).send({ status: 200, message: "OTP sent" })

                // CODE BEL0W MAY BE A CAUSE OF BUG  !!! -----------------

                otpSchema.find({ email: email }).then((r1) => {
                    if (r1[0] != 0 && Number(new Date) - r1[0].otp.time > 60000) {
                        console.log("multiple requests existed")
                        otpSchema.deleteOne({ email: email }).then((r3) => {
                            console.log("opt data deleted")
                        }).catch((err) => {
                            console.log("error in otp data deletion")
                        })

                        newUserSchema.deleteOne({ email: email }).then((r4) => {
                            console.log("newUserSchema data deleted")
                        }).catch((err) => {
                            console.log("error in newUserSchema data deletion")
                        })
                    }
                })

            }).catch((err) => {
                console.log("error in  sending otp")
                console.log(err)
            })

            bcrypt.genSalt(10, function (err, salt) {
                if (err) {
                    console.log("Error in Encryption salt generation !")
                }
                else {
                    bcrypt.hash(password, salt, function (err, hash) {
                        if (err) {
                            console.log("Error in Encryption hash Generation !")
                        }
                        else {
                            encrptPassword = hash
                            newUserSchema.insertMany({ name: name, email: email, password: encrptPassword, latitude: lat, longitude: lon }).then((r11) => {
                                console.log("data stored successfully")
                            }).catch((err) => {
                                console.log("error in storing data")
                                console.log(err)
                            })
                        }
                    })
                }
            })


            otpSchema.insertMany({ otp: otp, time: Number(new Date()), email: email }).then((r) => {
                console.log("instertion in otp schema : sucessful")
            }).catch((err) => {
                console.log("error in inserting data in otpschema")

                newUserSchema.deleteOne({ email: email }).then((r1) => {
                    console.log("new user temp data deletion successful")
                }).catch((err) => {
                    console.log("error in newuser temp data deletion")
                })
            })
        }
        else {
            console.log("User already exixted with this email address !!!")
            res.status(403).send({ status: 403, message: "User already exists with this email address !" })
        }
    }).catch((errr) => {
        console.log("error occured while searching user in database !!!")
        console.log(errr)
    })
}

exports.unsubscribe=(req,res)=>{
    const {unsubscribingMail, password} = req.body
        userSchema.find({email:unsubscribingMail}).then((result)=>{
            bcrypt.compare(password, result[0].password, function(err, status){
                if(err){
                    console.log("error in unsubscription")
                    console.log(err)
                }
                else{
                    if(status){
                        userSchema.updateOne({email : result[0].email}, {$set:{subscribed : false}}).then((r1)=>{
                            console.log("unsubscribed successfully")
                            res.status(200).send({ status: 200, message: "Unsubscribed Successfully !" })
                        }).catch((error)=>{
                            console.log(error)
                        })
                    }
                    else{
                        console.log("invalid password")
                        res.status(300).send({ status: 300, message: "Invalid Username or Password !" })

                    }
                }
            })
        })
}

exports.verifyOtp = (req, res) => {
    const { email, userEnteredOtp } = req.body
    newUserSchema.find({ email: email }).then((r1) => {
        if (r1.length == 0) {
            res.send("no such email address found")
        }
        else {
            otpSchema.find({ email: email }).then((r2) => {
                if (r2.length == 0) {
                    res.send("We think your otp may probabily not stored in our database, sorry!")
                }
                else {
                    if (userEnteredOtp == r2[0].otp) {

                        if (Number(new Date) - Number(r2[0].time) < 300000) {
                            userSchema.insertMany({ name: r1[0].name, email: r1[0].email, password: r1[0].password, subscribed:true, latitude:r1[0].latitude, longitude:r1[0].longitude })
                            res.status(200).send({ status: 200, message: "Registration Successfull !" })
                            console.log("registration successfull")
                        }
                        else {
                            res.status(403).send({ status: 403, message: "Time Limit Exceeded !" })
                            console.log("time limit exceed !!!")
                        }

                        newUserSchema.deleteOne({ email: email }).then((r1) => {
                            console.log("new user temp data deletion successful")
                        }).catch((err) => {
                            console.log("error in newuser temp data deletion")
                        })

                        otpSchema.deleteOne({ email: email }).then((r3) => {
                            console.log("opt data deleted")
                        }).catch((err) => {
                            console.log("error in otp data deletion")
                        })
                    }
                    else {
                        console.log("invalid otp")
                        res.status(401).send({ status: 401, message: "Invalid OTP !" })
                    }
                }
            })
        }
    })

}

exports.login = (req, res) => {
    const { email, password, lat, lon } = req.body

    userSchema.find({ email: email }).then((r1) => {
        if (r1.length == 0) {
            res.send("no such user exists")
            console.log("no such user exists")
        }
        else {
            bcrypt.compare(password, r1[0].password, function (err, status) {
                if (err) {
                    console.log("Error in password matching")
                }
                else {
                    if (status) {
                        console.log("Login Successful, Welcome " + r1[0].name)
                        res.status(200).send({ status: 200, message: "login successfull" })
                        userSchema.updateOne({email : email}, {$set:{latitude : String(lat), longitude:String(lon)}}).catch((errr)=>{console.log(errr)})
                    }
                    else {
                        console.log("invalid password")
                        res.status(312).send({ status: 312, message: "invalid password" })
                    }
                }
            })
        }
    })
}