const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');


var userSchema = new Schema({
    name: { type: String, required: true, unique: true, maxlength: 30, minlength: 5 },
    username: { type: String, lowercase: true, required: true, unique: true, maxlength: 20, minlength: 5 },
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String,required: true, maxlength: 20, minlength: 5 }
});

userSchema.pre('save', function(next){
    var newUser = this;
    bcrypt.hash(newUser.password, null, null, function(err, hash) {
        if(err) return next(err);
        newUser.password = hash;
        next();
    });
});

const User = module.exports = mongoose.model('User', userSchema);

//To get User by Id
module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

//To get User by Username
module.exports.getUserByUsername = function(username, callback){
    var query = {username : username}
    User.findOne(query, callback);
}


//To get User by Name
module.exports.getUserByName = function(name, callback){
    var query = {name : name}
    User.findOne(query, callback);
}

//Password comparetor
module.exports.comparePassword = function(candidatePassword, hashPassword, callback){
    bcrypt.compare(candidatePassword, hashPassword, (err, isMatch)=>{
        if(err) throw err;
        callback(null, isMatch);
    });
}
