function convertToResponseUser(user) {
	user.id = user._id;
	delete user._id;
}

function convertToResponseUsers(users) {
    for(let user of users) {
		user.id = user._id;
		delete user._id;
		delete user.password;
    }
}

module.exports = {
	convertToResponseUser,
	convertToResponseUsers
};
