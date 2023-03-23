function convertToCategoryResponse(category) {
	category.id = category._id;
	delete category._id;
}

function convertToCategoriesResponse(categories) {
    for(let category of categories) {
		convertToCategoryResponse(category);
    }
}

module.exports = {
	convertToCategoryResponse,
	convertToCategoriesResponse
};
