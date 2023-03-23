const productService = require("../services/productService");
const categoryService = require("../services/categoryService");
const authorisationService = require("../services/authorisationService");
const { convertToProductResponse, convertToProductsResponse } = require("../mappers/productMapper");
const { ObjectId } = require("mongodb");

async function getMany(req, res, next) {
	try {
		let products = await productService.getMany();
		convertToProductsResponse(products);
		res.json(products);
	} catch (err) {
		console.error(`Error while getting products`, err.message);
		next(err);
	}
}

async function getSingle(req, res, next) {
	try {
		let product = await productService.getSingle(req.params.id);
		if (product != null) {
			convertToProductResponse(product);
			res.json(product);
		} else {
			res.status(404);
			res.json({ message: "product not found" });
		}
	} catch (err) {
		console.error(`Error while getting product`, err.message);
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

		let category = await categoryService.getSingle(req.body.category);
		if (category == null) {
			res.status(400);
			res.json({ message: "category not found" });
			return;
		}

		let newProduct = {
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
			lager: req.body.lager,
			category: new ObjectId(req.body.category),
		};

		let result = await productService.create(newProduct);
		res.status(201);
		res.json({ message: "success", id: result.insertedId });

	} catch (err) {
		console.error(`Error while creating product`, err.message);
		next(err);
	}
}

async function getByCategory(req, res, next) {
	try {
		let products = await productService.getByCategory(req.params.categoryId);
		convertToProductsResponse(products);

		res.json(products);
	} catch (err) {
		console.error(`Error while getting products`, err.message);
		next(err);
	}
}

module.exports = {
	getMany,
	getSingle,
	create,
	getByCategory,
};
