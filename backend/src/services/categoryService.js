const { ObjectId } = require('mongodb');
const mongo = require('./mongoService');

const collection = () => mongo.connection.collection('categories');

async function getMany() {
    let categories = await collection().find({ 'isDeleted': false }, { projection: { isDeleted: 0 } }).toArray();
	return categories;
}

async function create(category) {
	category.isDeleted = false;
	return await collection().insertOne(category);
}

module.exports = {
	getMany,
	create
}
