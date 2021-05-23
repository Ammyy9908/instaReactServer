const {Schema,model} = require('mongoose')

const userSchema = new Schema({
    avatar:{
        type: 'string',
        default:null
    },
    birthdate:{
        type:Date,
        default:null,
    },
    full_name:{
        type: 'string',
        required: true
    },
    username:{
        type: 'string',
        required: true
    },
    password:{
        type: 'string',
        required: true
    },
    email:{
        type: 'string',
        required: true
    },
    last_ip:{
        type: 'string',
    },
    bio:{
            type: 'string',
            default: ''
    },
    website:{
        type: 'string',
        default:""
    },
    phone:{
        type: 'string',
        default:""
    },
    gender:{
        type: 'string',
        default:"Gender"
    },
    loginActivity:{
        
            type:"Array",
            default:[] 
    },
    accountType:{
        type: 'string',
        default:'Personal'
    },
    isPrivate:{
        type:"boolean",
        default:false
    },
    allowSharing:{
        type:"boolean",
        default:false
    },
    activityStatus:{
        type:"boolean",
        default:false
    },
    verifyCode:{
        type:'object',
    },
    isVerified:{
        type:"boolean",
        default:false
    }
},
{ timestamps: true }
)

module.exports = model("user",userSchema)


//Personal,Creator,Business