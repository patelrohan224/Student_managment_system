const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

// step 1 :- create the schema for user
const adminSchema = new mongoose.Schema({
    name: {type: String, required: false},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true, minLength: 8, maxLength: 100},
    roles:{type: Array, default: 'admin'}
}, {
    versionKey: false,
    timestamps: true
});

// create and update
adminSchema.pre("save", function(next) {
    if(! this.isModified("password")) return next();

    const hash = bcryptjs.hashSync(this.password, 8);
    this.password = hash

    return next();
})

adminSchema.methods.checkPassword = function(password) {
    const match = bcryptjs.compareSync(password, this.password);

    return match;
}

// step 2 :- connect the schema to the admins collection
const Admin = mongoose.model("admin", adminSchema); // admins

module.exports = Admin;