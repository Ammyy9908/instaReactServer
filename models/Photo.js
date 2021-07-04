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
    location:{
        type: 'string',
        required:true
    },
    image:{
        type: 'object',
        required:true
    },
    commentOff:{
        type: 'boolean',
        default:false
    },
    altText:{
        type: 'string',
       
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