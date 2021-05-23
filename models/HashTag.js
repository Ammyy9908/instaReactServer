const {Schema,model} = require('mongoose')

const hashTagSchema = new Schema({
  hashtag:{
      type: 'string',
      require:true
  }
},
{ timestamps: true }
)

module.exports = model("hashtag",hashTagSchema)