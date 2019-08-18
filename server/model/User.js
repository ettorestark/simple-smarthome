const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
	username: {
		type: String,
		min: 6,
		required: true
	},

	email: {
		type: String,
		min: 6,
		required: true
	},

	password: {
		type: String,
		min: 6,
		required: true
	},

	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('user', userSchema);