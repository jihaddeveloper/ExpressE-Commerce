const exppress = require('express');
const router = exppress.Router();
var ObjectId = require('mongoose').Types.ObjectId;

//Import User Model
var {User} = require('../models/user');

//To add An User's data
router.post('/',(req, res)=>{
    var user = new User();
    
    user.username = req.body.username;
    user.password = req.body.password;
    user.email = req.body.email;
    
    user.save((err, docs)=>{
        if(!err){
            res.send(docs);
        }
        else{
            console.log('Error in User Addition :'+ JSON.stringify(err, undefined, 2));
        }
    });
});

//To get all the Users
router.get('/',(req, res)=>{
    User.find((err, docs)=>{
        if(!err){
            res.send(docs);
        }
        else{
            console.log('Error in Retriving Users :'+ JSON.stringify(err, undefined, 2));
        }
    });
});

//To get An User with ID
router.get('/:id', (req, res)=>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send('No record found with given id : ' + `${req.params.id}`);
    }
    User.findById(req.params.id, (err, docs)=>{
        if(!err){
            res.send(docs);
        }
        else{
            console.log('Error in Retriving Users :'+ JSON.stringify(err, undefined, 2));
        }
    });
});

//Update User with ID
router.put('/:id', (req, res)=>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send('No record found with given id : ' + `${req.params.id}`);
    }
    var user = {
        name : req.body.name,
        position : req.body.position,
        office : req.body.office,
        salary : req.body.salary
    };
    User.findByIdAndUpdate(req.params.id, {$set : user}, {new : true},(err, doc)=>{
        if(!err){
            res.send(doc);
        }
        else{
            console.log('Error in User Update :'+ JSON.stringify(err, undefined, 2));
        }
    });
});

//Delete An User with ID
router.delete('/:id', (req, res)=>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send('No record found with given id : ' + `${req.params.id}`);
    }
    User.findByIdAndRemove(req.params.id, {$set : user}, {new : true},(err, doc)=>{
        if(!err){
            res.send(doc);
        }
        else{
            console.log('Error in User Delete :'+ JSON.stringify(err, undefined, 2));
        }
    });
});



module.exports = router;