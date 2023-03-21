const productService = require("../services/productService");

async function getMany(req, res, next) {
	try {
		let products = await productService.getMany();
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
		// check correct & existing token
		let newProduct = {
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
			lager: req.body.lager,
			category: req.body.category,
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
