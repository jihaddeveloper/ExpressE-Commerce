const exppress = require('express');
const router = exppress.Router();
var ObjectId = require('mongoose').Types.ObjectId;

//Import User Model
var User = require('../models/user');

//To add An User's data
router.post('/register',(req, res, next)=>{
    var user = new User({
        name : req.body.name,
        username : req.body.username,
        email : req.body.email,
        password : req.body.password
    });

    if(req.body.username == null || req.body.username == '' || req.body.email == null || req.body.email == '' || req.body.password == null || req.body.password == ''){
        res.send('Ensure username, email and password were provided in correct format');
    }
    else{
        user.save((err, docs)=>{
            if(!err){
                res.send(docs);
            }
            else{
                res.send('Error in User Addition :'+ JSON.stringify(err, undefined, 2));
            }
        });
    }
    
});

//Authenticate User
router.get('/authenticate', (req, res, next)=>{
    res.send('Authenticate');
});

//Profile of User
router.get('/profile', (req, res, next)=>{
    res.send('Profile');
});

//Validate User
router.get('/validate', (req, res, next)=>{
    res.send('Validate');
});

//To get all the Users
router.get('/all',(req, res)=>{
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
router.get('/all/:id', (req, res)=>{
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
router.put('/update/:id', (req, res)=>{
    if(!ObjectId.isValid(req.params.id)){
        return res.status(400).send('No record found with given id : ' + `${req.params.id}`);
    }
    var user = {
        username : req.body.username,
        email : req.body.email,
        password : req.body.password
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
router.delete('/delete/:id', (req, res)=>{
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