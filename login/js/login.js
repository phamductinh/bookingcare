const listAccount = [
	{
		email: "admin@gmail.com",
		password: "123456",
	},
];

let isLogin = !!localStorage.getItem("token");

function checkSucceed() {
	if (isLogin) {
		window.location.href = "/manage-user/manage_user.html";
	}
}

function Login() {
	let email = document.getElementById("email").value;
	let password = document.getElementById("password").value;
	let checkLogin = listAccount.some(
		(value) => value.email === email && value.password === password
	);
	if (checkLogin) {
		localStorage.setItem("token", email);
		isLogin = true;
		checkSucceed();
	} else {
		alert("Wrong email or password !");
	}
}

function logout() {
	localStorage.isLogin = "false";
	localStorage.removeItem("token");
	window.location.href = "/login/login.html";
}
