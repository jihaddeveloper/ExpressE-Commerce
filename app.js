//Imports
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const passport = require('passport');
const dbConfig = require('./config/dbConnection');


//Application
const app = express();

//Port
const port = 3000 || process.env.port;

//Link of the Server
app.listen(port, function () {
    console.log('The server is live on http://127.0.0.1:3000/');
});

//DB Connection
mongoose.connect(dbConfig.dbConnection, (err) =>{
    if(!err)
        console.log('MongoDB connection Established, '+dbConfig.dbConnection);
    else
        console.log('Error in DB connection :' + JSON.stringify(err, undefined, 2));
});

//Middlewires
app.use(morgan('dev'));//Morgan to see Routes in shell/bash/command.
app.use(bodyParser.json());//Body Parser Middlewire
app.use(bodyParser.urlencoded({extended : true}));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//Templating/View Engine EJS
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/views/assests'));


//Static Folder
app.use(express.static(path.join(__dirname, 'public')));


//Import Routing Controllers
const homeController = require('./controllers/homeController');
const tasksController = require('./controllers/tasksController');
const employeeController = require('./controllers/employeeController');
const userController = require('./controllers/userController');


//Routing
app.use('/', homeController);
app.use('/tasks', tasksController);
app.use('/employees', employeeController);
app.use('/users', userController);




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
