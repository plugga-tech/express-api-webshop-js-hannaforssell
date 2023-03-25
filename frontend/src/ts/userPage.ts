import { ILoggedInUser } from './models/ILoggedInUser';
import * as backendService from './services/backendService'

const userForm = document.getElementById('userForm') as HTMLFormElement;

export function createLoginForm() {
	const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}') as ILoggedInUser;
	
	if (loggedInUser?.token != null) {
		userForm.innerHTML = /*html*/`
			<h1>Logged in as: ${loggedInUser.email}</h1>
			<button id="logoutUserBtn">Log out</button>
		`;
	} else {
		userForm.innerHTML = /*html*/`
		<h1>Log in</h1>
		<label>
			<input type="email" id="userLoginEmail" placeholder="Email" value="test@mail.com">
		</label>
		<label>
			<input type="password" id="userLoginPassword" placeholder="Password">
		</label>
		<button id="createUserBtn">Not a member yet?</button>
		<button type="submit">Log in</button>
	`;

		const createUserBtn = document.getElementById('createUserBtn') as HTMLButtonElement;
		createUserBtn.addEventListener('click', createUser);
		userForm.addEventListener('submit', (ev) => {
			ev.preventDefault();
			loginUser();
		});
	}
}

async function loginUser() {
	const userLoginEmail = document.getElementById('userLoginEmail') as HTMLInputElement;
	const userLoginPassword = document.getElementById('userLoginPassword') as HTMLInputElement;

	const userLoginResponse = await backendService.loginUser(userLoginEmail.value, userLoginPassword.value);

	const loggedInUser = {
		email: userLoginEmail.value,
		token: userLoginResponse.token
	};

	localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

	createLoginForm();
}

function createUser() {
	userForm.innerHTML = /*html*/`
		<h1>Create user</h1>
		<label>
			<input type="name" id="userLoginName" placeholder="Name">
		</label>
		<label>
			<input type="email" id="userLoginEmail" placeholder="Email">
		</label>
		<label>
			<input type="password" id="userLoginPassword" placeholder="Password">
		</label>
		<button id="loginUserBtn">Already a member?</button>
		<button type="submit">Log in</button>
	`;

	const loginUserBtn = document.getElementById('loginUserBtn') as HTMLButtonElement;
	loginUserBtn.addEventListener('click', createLoginForm);
}