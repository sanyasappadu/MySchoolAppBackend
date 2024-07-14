const mongoose  = require("mongoose")

const AdmissionSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    class:{
        type:String,
        required:true,
    },
    oldSchool:{
        type:String,
      },

},{
    timestamps:true
    }
)
const Admission = mongoose.model("Admission", AdmissionSchema)
module.exports = Admission;
