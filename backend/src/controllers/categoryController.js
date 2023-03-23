const categoryService = require("../services/categoryService");
const userService = require("../services/userService");
const authorisationService = require("../services/authorisationService");
const { convertToCategoriesResponse } = require("../mappers/categoryMapper");

async function getMany(req, res, next) {
	try {
		let categories = await categoryService.getMany(req.body.category);
		convertToCategoriesResponse(categories);
		res.json(categories);
	} catch (err) {
		console.error(`Error while getting categories`, err.message);
		next(err);
	}
}

async function create(req, res, next) {
	try {
		if (!authorisationService.isValid(req.body.token)) {
			res.status(401);
			res.json({ message: "invalid token" });
			return;
		}

		let newCategory = {
			name: req.body.name,
		};

		let result = await categoryService.create(newCategory);
		res.status(201);
		res.json({ message: "success", id: result.insertedId });

	} catch (err) {
		console.error(`Error while creating product`, err.message);
		next(err);
	}
}

module.exports = {
	getMany,
	create
};
