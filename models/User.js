const mongoose  = require("mongoose")

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        enum:['Male', 'Female', 'Other'],
        // required:true,
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
        // required:true
    },
    idnumber: {
        type: String,
        unique: true,
        required: true,
        default: function () {
            const now = new Date();
            const year = now.getFullYear().toString().slice(-3);
            const randomDigits = Math.floor(100 + Math.random() * 900); // Generates random 3-digit number
            const idPrefix = 'T';
            const schoolCode = "MES"
            return idPrefix + year + schoolCode + randomDigits;
        }
    },
    qualification:{
        type:[String],
        default:null
    },
    subjects:{
        type:[String],
        default:null
    },
    salaryDetails:{
        type:String,
        // required:true,
    },
    experience:{
        type:Number,
        default:null
    },
    class:{
      type:String,
      default:null
  },
  yearOfJoin:{
      type:String,
      default:null
  },
    role: {
        type: String,
        enum: ["hm", "vhm", "teacher-admin", "teacher", "student-admin", "class-leader", "student"],
      },
    isPasswordSet:{
        type:Boolean,
        default:null,
    }
},{
    timestamps:true
    }
)
const User = mongoose.model("User", UserSchema)
module.exports = User;