const {Schema,model} = require('mongoose')

const likeSchema = new Schema({
   uid:{
       type:'string',
       required: true
   },
   photo_id:{
       type:'string',
       required:true
   }
},
{ timestamps: true }
)

module.exports = model("like",likeSchema)