function convertToUserResponse(user) {
	user.id = user._id;
	delete user._id;
}

function convertToUsersResponse(users) {
    for(let user of users) {
		convertToUserResponse(user);
		delete user.password;
    }
}

module.exports = {
	convertToUserResponse,
	convertToUsersResponse
};
