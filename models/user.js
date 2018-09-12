var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');

var userSchema = new Schema({
    username: { type: String, lowercase: true, required: true, unique: true, maxlength: 20, minlength: 5 },
    email: { type: String, required: true, lowercase: true, unique: true },
    password: { type: String,required: true, maxlength: 20, minlength: 5 }
});

userSchema.pre('save', function(next){
    var user = this;
    bcrypt.hash(user.password, null, null, function(err, hash) {
        if(err) return next(err);
        user.password = hash;
        next();
    });
});

module.exports = mongoose.model('User', userSchema);

// var User = mongoose.model('User', {
//   username: { type: String, lowercase: true, required: true, unique: true, maxlength: 20, minlength: 5 },
//   password: { type: String,required: true, maxlength: 20, minlength: 5 },
//   email: { type: String, required: true, lowercase: true, unique: true }
// },'user');

// module.exports = {User};