const {Schema,model} = require('mongoose')

const photoCommentSchema = new Schema({
  photo_id:{
      type:'string',
      required:true
  },
  comment_id:{
      type:'string',
      required:true
  }
},
{ timestamps: true }
)

module.exports = model("photoComment",photoCommentSchema)