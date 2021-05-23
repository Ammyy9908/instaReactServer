const {Schema,model} = require('mongoose')

const commentScheama = new Schema({
   comment:{
       type: 'string',
       required:true
   }
},
{ timestamps: true }
)

module.exports = model("comment",commentScheama)