const { ObjectId } = require('mongodb');
const mongo = require('./mongoService');

const collection = () => mongo.connection.collection('users');

async function getMany() {
    let users = await collection().find({ 'isDeleted': false }).toArray();
    for(let user of users) {
		delete user.isDeleted;
    }
    return users;
}

async function getSingle(id) {
    let user = await collection().findOne({ '_id': new ObjectId(id), 'isDeleted': false });
    delete user.isDeleted;
	return user;
}

async function create(user) {
	const existingUser = await getUserByEmail(user.email);
	if (existingUser == null) {
		user.isDeleted = false;
		return await collection().insertOne(user);
	}

	return null;
}

async function getUserByEmail(email) {
    return await collection().findOne({ 'email': email, 'isDeleted': false });
}


async function remove(id) {
    // Updates the boolean isDeleted to true
    return await collection().updateOne({ '_id': new ObjectId(id) }, { $set: { isDeleted: true } });
}

module.exports = {
    getMany,
    getSingle,
    create,
    getUserByEmail,
    remove
}
