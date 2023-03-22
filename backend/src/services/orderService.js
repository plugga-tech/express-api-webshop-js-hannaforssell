const { ObjectId } = require('mongodb');
const mongo = require('./mongoService');

const collection = () => mongo.connection.collection('orders');

async function getAll() {
    return await collection().find({ 'isDeleted': false }, { projection: { isDeleted: 0 } }).toArray();
}

async function create(order) {
	order.isDeleted = false;
	return await collection().insertOne(order);
}

async function getByUser(userId) {
    return await collection().find({ 'user': userId, 'isDeleted': false }, { projection: { isDeleted: 0 } }).toArray();
}

module.exports = {
    getAll,
    create,
	getByUser
}
