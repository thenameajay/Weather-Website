const userSchema=require("../Schema/user")
const otpSchema = require("../Schema/otp")
const newUserSchema = require("../Schema/newUser")
const nodemailer = require('nodemailer')

// for email-------------------------------------------
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: email address daal,
        pass: passcode lga apna yaha,
    },
})
// --------------------------------------------------------

exports.addUser=(req,res)=>{
    const{name, email, password}=req.body
    const otp=Math.floor(Math.random()*1000000).toString()

    transporter.sendMail({
        from : '"Weathering"<thenameajay@gmail.com>',
        to : email,
        subject : "OTP verification",
        text : "OTP mail",
        html : "Hello "+name+", your otp for registering to Weathering is "+otp+". Please ignore if it not belongs to you and never share otp with anyone."
    }).then((r1)=>{
        console.log("otp sent")
    }).catch((err)=>{
        console.log("error in  sending otp")
        console.log(err)
    })

    newUserSchema.insertMany({name:name, email:email, password:password}).then((r1)=>{
        console.log(r1)
        console.log("data stored successfully")
    }).catch((err)=>{
        console.log("error in storing data")
        console.log(err)
    })

    otpSchema.insertMany({otp:otp, time:Number(new Date()), email:email }).then((r)=>{
        console.log("instertion in otp schema : sucessful")
        res.send("verify otp on /register/otp-verification")
    }).catch((err)=>{
        console.log("error in inserting data in otpschema")
    })
}

exports.verifyOtp=(req,res)=>{
    const {email, userEnteredOtp}=req.body
    newUserSchema.find({email:email}).then((r1)=>{
        if(r1.length==0){
            res.send("no such email address found")
        }
        else{
            otpSchema.find({email:email}).then((r2)=>{
                if(r2.length==0){
                    res.send("We think your otp may probabily not stored in our database, sorry!")
                }
                else{
                    if(userEnteredOtp==r2.otp){

                        userSchema.insertMany({name:r1[0].name, email:r1[0].email, password:r1[0].password })
                        res.send("registration successful")

                        newUserSchema.deleteOne({email:email}).then((r1)=>{
                            console.log("new user temp data deletion successful")
                        }).catch((err)=>{
                            console.log("error in newuser temp data deletion")
                        })

                        otpSchema.deleteOne({email:email}).then((r3)=>{
                            console.log("opt data deleted")
                        }).catch((err)=>{
                            console.log("error in otp data deletion")
                        })
                    }
                    else{
                        res.send("invalid otp")
                    }
                }
            })
        }
    })

}

exports.login=(req, res)=>{
    const {email, password} = req.body

    userSchema.find({email:email}).then((r1)=>{
        if(r1.length==0){
            res.send("no such user exists")
        }
        else{
            if(password==r1[0].password){
                res.send("login successfull")
            }
            else{
                res.send("invalid password")
            }
        }
    })
}