require("dotenv").config()
const express = require("express") 
const morgan = require("morgan")
const methodOverride = require("method-override")
const Animal = require("./models/zoo")
const AnimalRouter = require("./controllers/zoo")
const UserRouter = require("./controllers/user")
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require("mongoose");
const app = express()

//Middleware
app.use(morgan('tiny'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}));
app.use(session({
    secret: process.env.SECRET,
    store: MongoStore.create({mongoUrl: process.env.MONGODB_URI}),
    saveUninitialized: true,
    resave: false,
  }))

  app.use("/zoo", AnimalRouter)
  app.use("/user", UserRouter) 
//Port
//___________________
// Allow use of Heroku's port or your own local port, depending on the environment

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose

mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true });

// Error / success
// db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
// db.on('connected', () => console.log('mongod connected: ', MONGODB_URI));
// db.on('disconnected', () => console.log('mongod disconnected'));


//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


//___________________
// Routes
//___________________
//localhost:3000
app.get('/' , (req, res) => {
  res.render("index.ejs");
});

//___________________
//Listener
//___________________
const PORT = process.env.PORT
app.listen(PORT, () => console.log(`express is listening on ${PORT}`));