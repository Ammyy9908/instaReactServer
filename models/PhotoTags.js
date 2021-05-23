const {Schema,model} = require('mongoose')

const photoTagSchema = new Schema({
  photo_id:{
      type: 'string',
      required: true
  },
  tag_id:{
      type: 'string',
      required:true
  }
},
{ timestamps: true }
)

module.exports = model("photoTag",photoTagSchema)