const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Task = new Schema(
	{
		name: { type: String, required: true },
		due_date: { type: [String], required: true },
		info: { type: String, required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('tasks', Task);
