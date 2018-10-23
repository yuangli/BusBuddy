const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const schools = require('./routes/api/schools');

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

//Use routes
//First parameter is URL route, second is path var above
app.use('/api/schools', schools);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}!`));



