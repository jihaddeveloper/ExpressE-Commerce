//Imports
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

//Application
var app = express();

//Port
var port = 3000;

//Templating/View Engine EJS
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Link of the Server
app.listen(port, function () {
    console.log('The server is live on http://127.0.0.1:3000/');
})

//Static Folder
app.use(express.static(path.join(__dirname, 'client')));

//Body Parser Middlewire
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

//Routing
var index = require('./routes/home');
var tasks = require('./routes/tasks');

//Home Routing
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})

app.get('/about', function (req, res) {
    res.sendFile(__dirname + '/about.html');
})

app.get('/api', function (req, res) {
    res.sendFile(__dirname + '/api.html');
})

app.get('/contact', function (req, res) {
    res.sendFile(__dirname + '/contact.html');
})

//Bulk Data
var students = {
    1: {
        name: 'Mohammad',
        subjects: ['C', 'C++', 'Java', 'Mysql']
    },
    2: {
        name: 'Jihad',
        subjects: ['C#', 'React', '.Net', 'MSsql']
    },
    3: {
        name: 'Hossain',
        subjects: ['NodeJS', 'EJS', 'Firebase','MongoDB']
    }
}

app.get('/students/:id', function (req, res) {
    //Rendering Template called students
    res.render('students', {
        id : req.params.id,
        name : students[req.params.id].name,
        subjects : students[req.params.id].subjects
    });
})