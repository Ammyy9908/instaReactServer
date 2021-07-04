const router = require('express').Router();
const verify = require('../verifyToken');
const bcrypt = require('bcrypt')
const cors = require('cors');
const { check, validationResult } = require('express-validator');
const Photo = require('../models/Photo');
const sendMail = require('../utils/sendmail');
const jwt = require('jsonwebtoken');
const {cloudinary} = require('../utils/cloudinary');
router
.use(cors())
.get("/all",async (req, res)=>{
 const posts = await Photo.find({},{image:1,caption:1,comments:1,likes:1,upload_by:1});
   return res.status(200).send({posts})
 
 
})
.get("/:id",async function(req, res){
   const {id} = req.params;
   console.log("Requested post id:",id);
   const post = await Photo.findOne({_id:id});
   return res.status(200).send({post:post});r
})
.post("/add",async (req, res)=>{
   var io = req.app.get('socketio');
   const {image,caption,lattitude,longitude,user,uploadAt} = req.body;
   console.log(uploadAt,user);
   cloudinary.uploader.upload(file=image, { 
    upload_preset:'posts'
    }).then((response) => {
        
       

     const {url,public_id} = response;
     const newPhoto = new Photo({
        caption:caption,
        lattitude,
        longitude,
        image:{
           url,
           public_id
        },
        upload_by:user,
        uploadAt:uploadAt
     })

     newPhoto.save().then((post)=>{
       io.emit("newPost",{post:post});
        res.status(200).send({message:"Post saved successfully",error:0})
     }).catch(err => {
        console.log(err.message)
        res.status(500).send({message:"Error while saving post",error:err})
     })

      //   User.updateOne({_id: id},{avatar:url}).then(async ()=>{
      //       const user = await User.findOne({_id: id});
      //       console.log(user)
      //       res.status(200).send({code:1, message:"User data",user:{user:user.username,fullName:user.full_name,email:user.email,avatar:user.avatar,birthdate:user.birthdate,last_ip:user.last_ip,bio:user.bio,website:user.website,gender:user.gender,loginActivity:user.loginActivity,accountType:user.accountType,isPrivate:user.isPrivate,allowSharing:user.allowSharing,activityStatus:user.activityStatus,isVerified:user.isVerified,phone:user.phone,id:user._id}})
      //   }).catch((err) => {
      //       console.log(err);
      //   })
        
        
    }).catch((err) => {
        console.log(err);
    })
})
.put('/like/:postid',async (req, res)=>{
const {postid} = req.params;
const {user} = req.body;

const post = await Photo.findOne({_id:postid});
const likes = post.likes;

Photo.updateOne({_id:postid},{likes:[...likes,user]})
.then(() =>{
   return res.status(200).json({message:"Photo liked successfully!"});
})
})
.put('/unlike/:postid',async (req, res)=>{
   const {postid} = req.params;
   const {id} = req.body.user;
   
   const post = await Photo.findOne({_id:postid});
   const likes = post.likes;

   const newLikes = likes.filter((person)=>person.id!==id);
   console.log(newLikes);
   Photo.updateOne({_id:postid},{likes:newLikes})
.then(() =>{
   return res.status(200).json({message:"Photo unliked successfully!"});
})
   
   
   })

module.exports = router;