var express = require('express');
var app = express();
// Added Templating Engine EJS
app.set('view engine','ejs');

//Link of the server
app.listen(3000,function(){
    console.log('Our server is live on http://127.0.0.1:3000/');
})

//GET
//POST
//PUT
//DELETE

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
})

app.get('/about', function(req, res){
    res.sendFile(__dirname + '/about.html');
})

app.get('/api', function(req, res){
    res.sendFile(__dirname + '/api.html');
})

app.get('/contact', function(req, res){
    res.sendFile(__dirname + '/contact.html');
})

//Bulk Data
var students={
    1:'Mohammad',
    2:'Jihad',
    3:'Hossain'
}

app.get('/students/:id', function(req, res){
    //Rendering Template called students
    res.render('students',{id : req.params.id,name : students[req.params.id]});
})