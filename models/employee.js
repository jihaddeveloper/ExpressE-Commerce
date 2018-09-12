const mongoose = require('mongoose');
var Schema = mongoose.Schema;


var employeeSchema = new Schema({
    name : {type : String},
    position : {type : String},
    office : {type : String},
    salary : {type : Number}
});

module.exports = mongoose.model('Employee', employeeSchema);

// var Employee = mongoose.model('Employee', {
//     name : {type : String},
//     position : {type : String},
//     office : {type : String},
//     salary : {type : Number}
// },'employee');

// module.exports = {Employee};