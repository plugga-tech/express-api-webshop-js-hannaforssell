const { ObjectId } = require('mongodb');
const mongo = require('./mongoService');

const collection = () => mongo.connection.collection('products');

async function getMany() {
    let users = await collection().find({ 'isDeleted': false }).toArray();
    for(let user of users) {
		delete user.isDeleted;
    }
    return users;
}

async function getSingle(id) {
    let product = await collection().findOne({ '_id': new ObjectId(id), 'isDeleted': false });
    delete product.isDeleted;
	return product;
}

async function create(product) {
	product.isDeleted = false;
	return await collection().insertOne(product);
}

async function getCategories() {
    return await collection().find({ 'isDeleted': false }).toArray();
}

async function getByCategory(categoryId) {
    return await collection().find({ 'category': categoryId, 'isDeleted': false }).toArray();
}

module.exports = {
    getMany,
    getSingle,
    create,
	getCategories,
    getByCategory,
}
