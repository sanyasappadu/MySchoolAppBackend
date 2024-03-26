const mongoose  = require("mongoose")

const StudentSchema = new mongoose.Schema({
    name:{
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
    idnumber: {
        type: String,
        unique: true,
        required: true,
        default: function () {
            const now = new Date();
            const year = now.getFullYear().toString().slice(-3);
            const randomDigits = Math.floor(100 + Math.random() * 900); // Generates random 3-digit number
            const idPrefix = 'S';
            const schoolCode = "MES"
            return idPrefix + year + schoolCode + randomDigits;
        }
    },
    class:{
        type:String,
        required:true,
    },
    yearOfJoin:{
        type:String,
        required:true,
    },
    role: {
        type: String,
        enum: ["classLeader", "admin"],
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


// const student = {
//     name:"sunny",
//     age:22,
//     marks: {
//         class6:{
//             unit1:{
//                 telugu:{
//                     marks:22,
//                     MaxMarks:25,
//                 },
//                 hindhi:23,
//                 maxMarks:25
//             },
//         }
//      }
// }