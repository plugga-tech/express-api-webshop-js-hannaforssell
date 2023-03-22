const { ObjectId } = require('mongodb');
const mongo = require('./mongoService');

const collection = () => mongo.connection.collection('categories');

async function getMany() {
    return await collection().find({ 'isDeleted': false }, { projection: { isDeleted: 0 } }).toArray();
}

async function getSingle(id) {
    return await collection().findOne({ '_id': new ObjectId(id), 'isDeleted': false }, { projection: { isDeleted: 0 } });
}

async function create(category) {
	category.isDeleted = false;
	return await collection().insertOne(category);
}

module.exports = {
	getMany,
	getSingle,
	create
}
