const {Schema,model} = require('mongoose')

const photoSchema = new Schema({
    upload_by:{
        type:'object',
        required:true
    },
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
    image:{
        type: 'object',
        required:true
    },
    uploadAt:{
        type: 'string',
        required:true
    },
    comments:{
        type:"array",
        default:[]
    },
    likes:{
        type:"array",
        default:[]
    }
},
{ timestamps: true }
)

module.exports = model("photo",photoSchema)