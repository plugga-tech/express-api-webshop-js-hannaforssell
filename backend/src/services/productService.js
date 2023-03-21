const { ObjectId } = require('mongodb');
const mongo = require('./mongoService');

const collection = () => mongo.connection.collection('products');

async function getMany() {
    let users = await collection().find({ 'isDeleted': false }, { projection: { isDeleted: 0 } }).toArray();
    return users;
}

async function getSingle(id) {
    let product = await collection().findOne({ '_id': new ObjectId(id), 'isDeleted': false }, { projection: { isDeleted: 0 } });
	return product;
}

async function create(product) {
	product.isDeleted = false;
	return await collection().insertOne(product);
}

async function getByCategory(categoryId) {
    return await collection().find({ 'category': categoryId, 'isDeleted': false }, { projection: { isDeleted: 0 } }).toArray();
}

module.exports = {
    getMany,
    getSingle,
    create,
    getByCategory,
}
