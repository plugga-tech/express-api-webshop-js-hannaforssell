const tokens = [];

function addToken(token) {
	tokens.push(token);
}

function isValid(token) {
	// todo: delete return true
	return true;
	return tokens.includes(token);
}

module.exports = {
	addToken,
	isValid
}
