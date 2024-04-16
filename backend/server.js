const { Int32 } = require("mongodb");
const mongoose = require("mongoose");

const user = 'user1';
const pass = 'user123'

const uri = "mongodb+srv://user1:user123@project.bpbljqv.mongodb.net/?retryWrites=true&w=majority&appName=PROJECT"
mongoose.connect(uri)
	.then(() => {
		console.log("mongodb connected");
	})
	.catch(() => {
		console.log('failed');
	})

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	affiliation: {
		type: String,
		required: true
	},
	affiliation_address: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	contact_no: {
		type: String,
		required: true
	},
	website: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: false
	},
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	status: {
		type: String,
		required: true
	}
})

const orgSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	}
})

const publicationSchema = new mongoose.Schema({
	user: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	authors: {
		type: String,
		required: true
	},
	keywords: {
		type: String,
		required: true
	},
	abstract: {
		type: String,
		required: true
	},
	pdf: {
		type: String,
		required: true
	},
	status: {
		type: String,
		required: true
	}
})

const userCollection = mongoose.model("users", userSchema)
const orgCollection = mongoose.model("organization", orgSchema)
const publicationCollection = mongoose.model("papers", publicationSchema)

module.exports = {
	userCollection,
	orgCollection,
	publicationCollection
}