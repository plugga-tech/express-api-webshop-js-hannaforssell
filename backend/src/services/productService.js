const { ObjectId } = require('mongodb');
const mongo = require('./mongoService');

const collection = () => mongo.connection.collection('products');

async function getMany() {
    return await collection().find({ 'isDeleted': false }, { projection: { isDeleted: 0 } }).toArray();
}

async function getSingle(id) {
    return await collection().findOne({ '_id': new ObjectId(id), 'isDeleted': false }, { projection: { isDeleted: 0 } });
}

async function create(product) {
	product.isDeleted = false;
	return await collection().insertOne(product);
}

async function getByCategory(categoryId) {
    return await collection().find({ 'category': new ObjectId(categoryId), 'isDeleted': false }, { projection: { isDeleted: 0 } }).toArray();
}

async function changeOnHand(productId, quantity) {
	return await collection().updateOne({ '_id': new ObjectId(productId) }, { $inc: { lager: -quantity } });
}

module.exports = {
    getMany,
    getSingle,
    create,
    getByCategory,
	changeOnHand
}
