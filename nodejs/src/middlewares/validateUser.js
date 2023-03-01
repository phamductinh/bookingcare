function validateEmail(email) {
	if (email.length > 256) {
		return false;
	}
	const pattern =
		/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
	return pattern.test(email);
}

function validatePassword(password) {
	if (password.length < 8 || password.length > 30) {
		return false;
	}
	const regex =
		/^(?=.*[A-Z])(?=.*[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/])(?=.*[a-zA-Z]).{8,30}$/;
	return regex.test(password);
}

function validateFullName(fullName) {
	if (fullName.length > 100) {
		return false;
	}
	const regex = /^[a-zA-Z\s]+$/;
	return regex.test(fullName);
}

module.exports = {
	validateEmail,
	validatePassword,
	validateFullName,
};
