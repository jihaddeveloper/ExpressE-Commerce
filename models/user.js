var mongoose = require('mongoose');
// var Schema = mongoose.Schema;


// var userSchema = new Schema({
//     username: { type: String, lowercase: true, required: true, unique: true, maxlength: 20, minlength: 5 },
//     password: { type: String,required: true, maxlength: 20, minlength: 5 },
//     email: { type: String, required: true, lowercase: true, unique: true }
// });

// module.exports = mongoose.model('User', userSchema);

var User = mongoose.model('User', {
  username: { type: String, lowercase: true, required: true, unique: true, maxlength: 20, minlength: 5 },
  password: { type: String,required: true, maxlength: 20, minlength: 5 },
  email: { type: String, required: true, lowercase: true, unique: true }
},'user');

module.exports = {User};