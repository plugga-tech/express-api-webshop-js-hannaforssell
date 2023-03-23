const { ObjectId } = require('mongodb');

function convertToOrderResponse(order) {
	order.id = order._id;
	delete order._id;
}

function convertToOrdersResponse(orders) {
    for(let order of orders) {
		convertToOrderResponse(order);
    }
}


function mapToDbOrder(orderRequest) {
	let newOrder = {
		user: new ObjectId(orderRequest.user),
		products: orderRequest.products.map(mapToDbOrderProduct)
	};

	return newOrder;
}

function mapToDbOrderProduct(orderProductRequest) {
	return {
		productId: new ObjectId(orderProductRequest.productId),
		quantity: orderProductRequest.quantity
	}
}

module.exports = {
	convertToOrderResponse,
	convertToOrdersResponse,
	mapToDbOrder
};
