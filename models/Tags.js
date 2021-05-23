const {Schema,model} = require('mongoose')

const tagSchema = new Schema({
  tag_name:{
      type: 'string',
      required: true
  }
},
{ timestamps: true }
)

module.exports = model("tag",tagSchema)