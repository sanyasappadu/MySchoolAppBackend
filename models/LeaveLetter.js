const mongoose  = require("mongoose")

const LeaveletterSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    idnumber:{
        type:String,
        required:true,
    },
    startDate:{
        type:String,
        required:true,
    },
    endDate:{
        type:String,
        required:true,
    },
    description:{
      type:String,
    },
    class:{
        type:String,
        required:true,
    },

},{
    timestamps:true
    }
)
const Leaveletter = mongoose.model("Leaveletter", LeaveletterSchema)
module.exports = Leaveletter;
