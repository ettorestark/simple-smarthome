const Joi = require('@hapi/joi');

const signUpValidation = (data) => {
	const schema = {
		username: Joi.string().min(6).required(),
		email: Joi.string().email({ minDomainSegments: 2 }).required(),
		password: Joi.string().min(6).required()
	}

	return Joi.validate(data, schema);
};

const signInValidation = (data) => {
	const schema = {
		email: Joi.string().email({ minDomainSegments: 2 }).required(),
		password: Joi.string().min(6).required()
	};

	return Joi.validate(data, schema);
};

module.exports.signUpValidation = signUpValidation;
module.exports.signInValidation = signInValidation;