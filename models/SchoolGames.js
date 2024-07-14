const mongoose  = require("mongoose")

const GameSchema = new mongoose.Schema({
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
    game:{
      type:String,
    },
},{
    timestamps:true
    }
)
const Game = mongoose.model("Game", GameSchema)
module.exports = Game;
