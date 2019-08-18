const express = require('express');
const mongoose = require('mongoose');

const app = express();

//Connection to database 
mongoose.connect('mongodb://localhost/smart', { useNewUrlParser: true })
	.then(response => {
		console.log('Database connected');
	}).catch(err => {
		console.log(err);
	});

//Import Routes
const authRoute = require('./routes/auth');

//Settings 
app.set('port', process.env.PORT || 3000);


//Middlewares
app.use(express.json());

//Routes
app.use('/api/user/', authRoute);

//Server
app.listen(app.get('port'), () => {
	console.log('Server on port', app.get('port'));
});