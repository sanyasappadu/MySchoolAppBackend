const mongoose  = require("mongoose")

const ComplaintSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    idnumber:{
        type:String,
        required:true,
    },
    class:{
        type:String,
        required:true,
    },
    description:{
      type:String,
    },
},{
    timestamps:true
    }
)
const Complaint = mongoose.model("Complaint", ComplaintSchema)
module.exports = Complaint;
