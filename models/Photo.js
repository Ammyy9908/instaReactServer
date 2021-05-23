const {Schema,model} = require('mongoose')

const photoSchema = new Schema({
    caption:{
        type: 'string',
        required:false
    },
    lattitude:{
        type: 'string',
        required:true
    },
    longitude:{
        type: 'string',
        required:true
    },
    uri:{
        type: 'string',
        required:true
    }
},
{ timestamps: true }
)

module.exports = model("photo",photoSchema)