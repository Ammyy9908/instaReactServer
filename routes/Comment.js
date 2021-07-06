const router = require('express').Router();
const Comment = require('../models/Comments');
const PhotoComment = require('../models/PhotoComment')


router.get('/fetch/:id',async (req, res)=>{
   const {id} = req.params;
   const comments = await Comment.find({photo_id:id},{_id:1,comment:1,comment_by:1,timestamp:1})
   return res.status(200).send({comments})
})
router.post('/comment',async (req, res) => {
   const {comment,photo_id,user,timestamp} = req.body;
   const newComment = new Comment({
      comment,
      photo_id,
      comment_by:user,
      timestamp
   })
   const savedComment = await newComment.save();
   savedComment;
   return res.status(200).send({id:savedComment._id,comment:savedComment.comment,comment_by:user,timestamp});
  

})

module.exports = router;