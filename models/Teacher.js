const mongoose  = require("mongoose")

const TeacherSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        enum:['Male', 'Female', 'Other'],
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    img:{
        type:String,
    },
    phonenumber:{
        type:String,
        required:true
    },
    idnumber:{
        type:String,
        unique:true,
        required:true,
        default:function(){return Math.random().toString(36).substring(2,10)}
    },
    qualification:{
        type:[String],
        required:true,
    },
    subjects:{
        type:[String],
        required:true,
    },
    salaryDetails:{
        type:String,
        // required:true,
    },
    experience:{
        type:Number,
        required:true,
    },
    admin:{
        type:Boolean,
        default:null
    },
    isPasswordSet:{
        type:Boolean,
        default:null,
    }
},{
    timestamps:true
    }
)
const Teacher = mongoose.model("Teacher", TeacherSchema)
module.exports = Teacher;