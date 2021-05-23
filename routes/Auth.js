const router = require('express').Router();
const verify = require('../verifyToken');
const bcrypt = require('bcrypt')
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const sendMail = require('../utils/sendmail');
const jwt = require('jsonwebtoken');
router
.get("/user",verify,async (req, res)=>{
   
    const {email} = req.user;

    const user = await User.findOne({email: email});
    console.log(user)
    if(user){
        res.status(200).send({code:1, message:"User data",user:{user:user.username,fullName:user.full_name,email:user.email,avatar:user.avatar,birthdate:user.birthdate,last_ip:user.last_ip,bio:user.bio,website:user.website,gender:user.gender,loginActivity:user.loginActivity,accountType:user.accountType,isPrivate:user.isPrivate,allowSharing:user.allowSharing,activityStatus:user.activityStatus,isVerified:user.isVerified,phone:user.phone}})
    }
    
    
})
.put("/sendcode",async (req, res)=>{
    const email = req.body.email;

     // mailer function for sending mail for the confirmation code
    // 1. Create a transporter
    

    let code = Math.floor(100000 + Math.random() * 900000);
      const user = await User.findOne({email:email});
      if(user){
        await User.updateOne({email:email,verifyCode:{code:code,time:new Date().getTime()+5*60000}}).then((user)=>{
           

            if(user){
                sendMail(email,code).then((result)=>{
                    console.log(result);
                    return res.status(200).send({message:"Verification Sented to email",code:1});
                })
            }
        })
      }


})
.post('/reg',[check('email').isEmail().withMessage("Email must be a valid email address"),check('full_name').isLength({min:3,max:20}).withMessage("Make sure Your name can have minimum of 3 characters"),check('password').isLength({min:6,max:12}).withMessage("Password must be of 6 character long and maximum of 12 caharacter lon")],async (req, res) => {

    const ipdata = req.get('https://ipinfo.io/json');
    console.log(ipdata)
    const {email,username,full_name,password} = req.body;
    // validate the user fields

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

    // first check is the username already there or not

    const user = await User.findOne({username:username});
    if(user) {
        return res.status(400).send({message:"Username already in use create a new one",code:0,errors});
    }
    const emailUser = await User.findOne({email:email});
    if(emailUser) {
        return res.status(400).send({message:"This email already exists",code:0,errors:errors});
    }
    // else make a new user and save to db

    // first hash the text password to salted password

    const hash = bcrypt.hashSync(password,10);
    let code = Math.floor(100000 + Math.random() * 900000);
    const newUser = new User({
        email,
        username,
        full_name,
        password:hash,
        verifyCode:{
            time:new Date().getTime()+5*60000,
            code:code
        }
    });

   

   sendMail(email,code).then((data)=>{
       console.log(data);
   })

    newUser.save().then(()=>{
        const token = jwt.sign({email:email},process.env.TOKEN__SECRET);
        return res.status(200).send({message:"Successfully registered!",code:1,errors,token});
        
        
    }).catch(err=>{
        console.log(err)
        return res.status(500).send({message:err.message});
    })
    
})

.post('/login',[check('email').isEmail().withMessage("Email must be a valid email address")],async (req, res) => {
    const {email,password} = req.body;
    const errors = validationResult(req);
    const user = await User.findOne({email: email});
    if(!user) {
        return res.status(403).send({message:"User not found with email",errors});
    }

    // check user password matches with client password
    const isValid = await bcrypt.compare(password,user.password);

    if(!isValid){
        return res.status(403).send({message:"Invalid username or password",errors});
    }
    const token = jwt.sign({email:email},process.env.TOKEN__SECRET);
    res.status(200).send({message:"Logined",code:1,token:token,errors});
})
.post("/verify",async (req, res) => {
    const email = req.body.email;
    const verifyCode = req.body.verifyCode;

    //find the user with this email
    const user = await User.findOne({ email: email});

    if(user.verifyCode) {
        const {code} = user.verifyCode;

        // first check that current time is less or equal or less than

        

        // check that code present in db is match with client code
        if(code!=verifyCode){
            return res.status(400).send({message:"Invalid Verification code",code:0});
        }

        const updatedUser = await User.updateOne({email:email},{verifyCode:null,isVerified:true})
        if(updatedUser){
            return res.status(200).send({message:"Verified OK",username:user.username,code:1});
        }
        
    }
    
})
.put("/updateActivity",async (req, res)=>{
    
    const data = req.body.data;
    const {city} = data;
    const {ip} = data;
    const browser = req.body.browser;
    const email = req.body.email;

    console.log(req.body)

    const user = await User.findOne({email:email});

    if(user){
        const updatedUser = await User.updateOne({email:email,loginActivity:[...user.loginActivity,{ip:ip,city}],last_ip:ip})
       if(updatedUser){
            res.status(200).send({message:"Activity updated successfully",code:1,user});
        }
    }




})

module.exports = router;