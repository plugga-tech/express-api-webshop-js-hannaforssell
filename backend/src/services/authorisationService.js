const tokens = [process.env.ADMIN_KEY];

// function addToken(token) {
// 	tokens.push(token);
// }

function isValid(token) {
	return tokens.includes(token);
}

module.exports = {
	// addToken,
	isValid
}
