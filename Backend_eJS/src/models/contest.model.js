const mongoose=require("mongoose")

const contestSchemata = new mongoose.Schema({
    title:{type:String,required:true},
    type:{type:String,required:true},
    deadline:{type:Date,required:true},
    tags:{type:Array,required:true},
    time:{type:String,required:true},
    admin:{type:mongoose.Schema.Types.ObjectId,ref:"admins",required:true}
})
module.exports = mongoose.model("contests",contestSchemata)