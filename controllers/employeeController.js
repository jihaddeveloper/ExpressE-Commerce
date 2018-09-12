const exppress = require('express');
var router = exppress.Router();
var ObjectId = require('mongoose').Types.ObjectId;

//Import Employee Model
var Employee = require('../models/employee');

//To get all the Employees
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

//To get An Employee with ID
router.get('/:id', (req, res)=>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send('No record found with given id : ' + `${req.params.id}`);
    }
    Employee.findById(req.params.id, (err, docs)=>{
        if(!err){
            res.send(docs);
        }
        else{
            console.log('Error in Retriving Employees :'+ JSON.stringify(err, undefined, 2));
        }
    });
});

//To add An Employee's data
router.post('/',(req, res)=>{
    var employee = new Employee({
        name : req.body.name,
        position : req.body.position,
        office : req.body.office,
        salary : req.body.salary
    });
    employee.save((err, docs)=>{
        if(!err){
            res.send(docs);
        }
        else{
            console.log('Error in Employee Addition :'+ JSON.stringify(err, undefined, 2));
        }
    });
});

//Update Employee with ID
router.put('/:id', (req, res)=>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send('No record found with given id : ' + `${req.params.id}`);
    }
    var employee = {
        name : req.body.name,
        position : req.body.position,
        office : req.body.office,
        salary : req.body.salary
    };
    Employee.findByIdAndUpdate(req.params.id, {$set : employee}, {new : true},(err, doc)=>{
        if(!err){
            res.send(doc);
        }
        else{
            console.log('Error in Employee Update :'+ JSON.stringify(err, undefined, 2));
        }
    });
});

//Delete An Employee with ID
router.delete('/:id', (req, res)=>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send('No record found with given id : ' + `${req.params.id}`);
    }
    Employee.findByIdAndRemove(req.params.id, {$set : employee}, {new : true},(err, doc)=>{
        if(!err){
            res.send(doc);
        }
        else{
            console.log('Error in Employee Delete :'+ JSON.stringify(err, undefined, 2));
        }
    });
});

module.exports = router;