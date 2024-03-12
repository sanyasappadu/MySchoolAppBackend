const mongoose  = require("mongoose")

const StudentSchema = new mongoose.Schema({
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
    phone:{
      type:String,
    },
    img:{ 
        type:String,
    },
    idnumber:{
        type:String,
        unique:true,
        required:true,
        default:function(){return Math.random().toString(36).substring(2,10)}
    },
    class:{
        type:String,
        required:true,
    },
    yearOfJoin:{
        type:String,
        required:true,
    },
    admin:{
        type:Boolean,
        default:null,
    },
    isPasswordSet:{
        type:Boolean,
        default:null,
    },
},{
    timestamps:true
    }
)
const Student = mongoose.model("Student", StudentSchema)
module.exports = Student;