//Imports
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

//DB Connection
const {mongoose} = require('./dbConnection.js');

//Application
const app = express();

//Port
const port = 3000;

//Link of the Server
app.listen(port, function () {
    console.log('The server is live on http://127.0.0.1:3000/');
})

//Templating/View Engine EJS
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


//Static Folder for Angular
app.use(express.static(path.join(__dirname, 'client')));

//Body Parser Middlewire
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

//Routing Controllers
var homeController = require('./controllers/homeController');
var tasksController = require('./controllers/tasksController');
var employeeController = require('./controllers/employeeController');

//Routing
app.use('/', homeController);
app.use('/tasks', tasksController);
app.use('/employees', employeeController);

/*
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
*/
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
