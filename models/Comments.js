const {Schema,model} = require('mongoose')

const commentScheama = new Schema({
   comment:{
       type: 'string',
       required:true
   }
   ,photo_id:{
       type: 'string',
       required:true
   },
   comment_by:{
       type:"object",
   },
   timestamp:{
       type:"string",
   }
},
{ timestamps: true }
)

module.exports = model("comment",commentScheama)