const exppress = require('express');
var router = exppress.Router();

var {Employee} = require('../models/employee');

router.get('/',(req, res)=>{
    Employee.find((err, docs)=>{
        if(!err){
            res.send(docs);
        }
        else{
            console.log('Error in Retriving Employees :'+ JSON.stringify(err, undefined, 2));
        }
    });
});

module.exports = router;