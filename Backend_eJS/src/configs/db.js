const mongoose = require('mongoose');

module.exports = ()=>{
    return mongoose.connect("mongodb+srv://pagin:pagin@cluster0.kt5qr.mongodb.net/student_managment_system?retryWrites=true&w=majority")
}