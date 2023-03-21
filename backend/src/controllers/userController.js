const { convertToResponseUsers, convertToResponseUser } = require("../mappers/userMapper");
const userService = require("../services/userService");
const CryptoJS = require("crypto-js");
const salt = 'pepper';

async function getMany(req, res, next) {
	try {
		let users = await userService.getMany();
		convertToResponseUsers(users);
		res.json(users);
	} catch (err) {
		console.error(`Error while getting users`, err.message);
		next(err);
	}
}

async function getSingle(req, res, next) {
	try {
		let user = await userService.getSingle(req.body.id);
		if (user != null) {
			convertToResponseUser(user);
			res.json(user);
		} else {
			res.status(404);
			res.json({ message: "user not found" });
		}
	} catch (err) {
		console.error(`Error while getting user`, err.message);
		next(err);
	}
}

async function create(req, res, next) {
	try {
		let newUser = {
			name: req.body.name,
			email: req.body.email,
			password: CryptoJS.AES.encrypt(req.body.password, salt).toString(),
			isDeleted: false
		};

		let result = await userService.create(newUser);

		if (result != null) {
			res.status(201);
			res.json({ message: "success", id: result.insertedId });
		} else {
			res.status(400);
			res.json({ message: "User with that email already exists" });
		}
	} catch (err) {
		console.error(`Error while creating user`, err.message);
		next(err);
	}
}

async function login(req, res, next) {
	try {
		let user = await userService.getUserByEmail(req.body.email);
		
		if (user != null) {
			const decryptedPassword = CryptoJS.AES.decrypt(user.password, salt).toString(CryptoJS.enc.Utf8);
			if (decryptedPassword == req.body.password) {
				res.json({ message: "success" });
				return;
			}
		}

		res.status(401);
		res.json({ message: "Email or password was incorrect" });
	} catch (err) {
		console.error(`Error while updating user`, err.message);
		next(err);
	}
}

async function remove(req, res, next) {
	try {
		await userService.remove(req.params.id);
		res.json({ message: "success" });
	} catch (err) {
		console.error(`Error while deleting user`, err.message);
		next(err);
	}
}

module.exports = {
	getMany,
	getSingle,
	create,
	login,
	remove,
};
