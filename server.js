const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const schools = require('./routes/api/schools');
const buddies = require('./routes/api/buddies');
const home = require('./routes/pages/home');

const app = express();

//Bodyparser Middleware
app.use(bodyParser.json());

//DB Config
console.log("URI: ", require('./config/keys').mongoURI);
const db = require('./config/keys').mongoURI;

//Connect to Mongo
mongoose
	.connect(db)
	.then(() => console.log('MongoDB Connected...'))
	.catch((err) => console.log('Nope: ', err));

//Declare static files path
var buildDir = __dirname + "client/build";
app.use(express.static(buildDir));

//Use routes
//First parameter is URL route, second is path var above
app.use('/', home);
app.use('/api/schools', schools);
app.use('/api/buddies', buddies);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}!`));



