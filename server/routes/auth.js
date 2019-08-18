const router = require('express').Router();
require('dotenv').config();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { signUpValidation, signInValidation } = require('./validations/auth')

router.post('/sign_up', async (req, res) => {
	const { error } = signUpValidation(req.body);
	if(error) return res.status(400).json({
		input: error.details[0].context.label,
		message: error.details[0].message.split('" ')[1]
	})

	//Checking if the user is already in the database
	const emailExist = await User.findOne({ email: req.body.email });
	if(emailExist) return res.status(400).send({
		input: 'email',
		message: 'Email already exists'
	});

	//Hash the password
	const salt = await bcrypt.genSalt(10);
	const hashPassword = await bcrypt.hash(req.body.password, salt);

	const user = new User({
		username: req.body.username,
		email: req.body.email,
		password: hashPassword
	});

	try {
		const savedUser = await user.save();
		res.status(200);
	}catch(err) {
		res.status(400).send(err);
	}
});

router.post('/sign_in', async (req, res) => {
	const { error } = signInValidation(req.body);
	if(error) return res.status(400).json({
		input: error.details[0].context.label,
		message: error.details[0].message.split('" ')[1]
	})

	//Checking if the user exists
	const user = await User.findOne({ email: req.body.email });
	if(!user) return res.status(400).json({
		input: 'email',
		message: 'Email or passsword is wrong'
	});

	const validPass = await bcrypt.compare(req.body.password, user.password);
	if(!validPass) return res.status(400).json({
		input: 'email',
		message: 'Email or password is wrong'
	});

	//Create a token
	const token = jwt.sign({ user }, process.env.TOKEN_PASSWORD);
	res.json({
		user: {
			username: user.username,
			email: user.email
		},
		token
	})
});

module.exports = router;