const orderService = require("../services/orderService");
const userService = require("../services/userService");
const authorisationService = require("../services/authorisationService");
const { mapToDbOrder, convertToOrdersResponse } = require("../mappers/orderMapper");

async function getAll(req, res, next) {
	try {
		if (!authorisationService.isValid(req.params.token)) {
			res.status(401);
			res.json({ message: "invalid token" });
			return;
		}

		let orders = await orderService.getAll();
		convertToOrdersResponse(orders);
		res.json(orders);
	} catch (err) {
		console.error(`Error while getting orders`, err.message);
		next(err);
	}
}

async function create(req, res, next) {
	try {
		// todo: userId, productId must exist.
		// better mapper
		let newOrder = mapToDbOrder(req.body);

		let result = await orderService.create(newOrder);
		res.status(201);
		res.json({ message: "success", id: result.insertedId });

	} catch (err) {
		console.error(`Error while creating order`, err.message);
		next(err);
	}
}

async function getByUser(req, res, next) {
	try {
		if (!authorisationService.isValid(req.body.token)) {
			res.status(401);
			res.json({ message: "invalid token" });
			return;
		}

		let orders = await orderService.getByUser(req.body.user);
		convertToOrdersResponse(orders);
		res.json(orders);
	} catch (err) {
		console.error(`Error while getting orders`, err.message);
		next(err);
	}
}

module.exports = {
	getAll,
	create,
	getByUser
};
