const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const passport = require('passport');

const schools = require('./routes/api/schools');
const buddies = require('./routes/api/buddies');
const journies = require('./routes/api/journies');

const { ensureAuthenticated } = require('./config/auth');

//Passport Config
require('./config/passport')(passport);


const app = express();

//Bodyparser Middleware
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').mongoURI;

//Connect to Mongo
mongoose
	.connect(db)
	.then(() => console.log('MongoDB Connected...'))
	.catch((err) => console.log('Nope: ', err));

// Express session
const sessionMiddleware = session({
    // secret: process.env.SESSION_SECRET,
    secret: 'hello',
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: 10 * 60 * 1000
    },
    rolling: true
});

// Passport middleware
app.use(sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

//Declare static files path
//app.use(express.static(buildDir));

if(process.env.NODE_ENV === 'production'){
	//Set static folder
	app.use(express.static('client/build'));

	app.get('/', (req, res) =>{
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	})
}

//Use routes
//First parameter is URL route, second is path var above
app.use(express.static('client/build'));

app.get('/', (req, res) =>{
	res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.get('/heckyeah', ensureAuthenticated, (req, res) =>{
	res.sendFile(path.resolve(__dirname, 'client', 'build', 'views', 'backendprototype.html'));
});

app.get('/go', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'views', 'landing.html'));
});

app.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'views', 'dashboard.html'));
});

app.get('/map', ensureAuthenticated, (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'views', 'map.html'));
});


app.use('/register', require('./routes/api/RegisterController'));
app.use('/login', require('./routes/api/LoginController'));
app.use('/logout', require('./routes/api/LogoutController'));

app.use('/api/schools', schools);
app.use('/api/buddies', buddies);
app.use('/api/journies', journies);
app.use('/api/users', require('./routes/api/UserController'));


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}!`));



