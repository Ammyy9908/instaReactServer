
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv');

dotenv.config()

module.exports=function(req,res,next){
    let token = req.header('authorization');
    if (token.startsWith('Bearer ')) {
     // Remove Bearer from string
     token = token.slice(7, token.length).trimLeft();
   }
   try{
     const verified = jwt.verify(token,'MYSECRET');
     req.user = verified;
     next();
 }
 catch(err){
     res.status(400).send('Invalid token!');
     console.log(err);
 }
    
 }