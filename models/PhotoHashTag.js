const {Schema,model} = require('mongoose')

const photoHashtagSchema = new Schema({
  hash_tag_id:{
      type: 'string',
      require:true
  },
  photo_id:{
      type: 'string',
      required:true
  }
},
{ timestamps: true }
)

module.exports = model("photoHashtag",photoHashtagSchema)