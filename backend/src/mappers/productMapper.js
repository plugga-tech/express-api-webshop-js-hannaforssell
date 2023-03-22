function convertToProductResponse(product) {
	product.id = product._id;
	delete product._id;
}

function convertToProductsResponse(products) {
    for(let product of products) {
		convertToProductResponse(product);
    }
}

module.exports = {
	convertToProductResponse,
	convertToProductsResponse
};
