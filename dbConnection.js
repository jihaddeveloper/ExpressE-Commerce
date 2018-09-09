const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/e-commerce', (err) =>{
    if(!err)
        console.log('MongoDB connection Established.');
    else
        console.log('Error in DB connection :' + JSON.stringify(err, undefined, 2));
});

module.exports = mongoose;