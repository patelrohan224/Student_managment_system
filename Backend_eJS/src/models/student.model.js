const mongoose=require("mongoose")

const studentSchemata = new mongoose.Schema({
    name:{type:String,required:true},
    city:{type:String,required:true},
    age:{type:Number,required:true},
    education:{type:String,required:true},
    gender:{type:String,required:true},
    contact:{type:Number,required:true},
    admin:{type:mongoose.Schema.Types.ObjectId,ref:"admins",required:true}
})
module.exports = mongoose.model("students",studentSchemata)