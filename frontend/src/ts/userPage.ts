import { ILoggedInUser } from './models/ILoggedInUser';
import * as backendService from './services/backendService';

const userFormContainer = document.getElementById('userFormContainer') as HTMLDivElement;

export function createLoginForm() {
	const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}') as ILoggedInUser;
	
	if (loggedInUser?.email != null) {
		userFormContainer.innerHTML = /*html*/`
			<h1>Logged in as: ${loggedInUser.email}</h1>
			<button id="logoutUserBtn">Log out</button>
		`;
		const logoutUserBtn = document.getElementById('logoutUserBtn') as HTMLButtonElement;
		logoutUserBtn.addEventListener('click', (ev) => {
			ev.preventDefault();
			localStorage.removeItem('loggedInUser');
			createLoginForm();
		});
	} else {
		userFormContainer.innerHTML = /*html*/`
			<form id="loginUserForm" class="user-form">
				<h1>Log in</h1>
				<label>
					<input type="email" id="loginUserEmail" placeholder="Email" value="test@mail.com">
				</label>
				<label>
					<input type="password" id="loginUserPassword" placeholder="Password">
				</label>
				<button type="submit">Log in</button>
				<button id="switchToCreateUserBtn">Not a member yet?</button>
			</form>
	`;

		const switchToCreateUserBtn = document.getElementById('switchToCreateUserBtn') as HTMLButtonElement;
		switchToCreateUserBtn.addEventListener('click', createUserForm);

		const loginUserForm = document.getElementById('loginUserForm') as HTMLFormElement;
		loginUserForm.addEventListener('submit', (ev) => {
			ev.preventDefault();
			loginUser();
		});
	}
}

async function loginUser() {
	const loginUserEmail = document.getElementById('loginUserEmail') as HTMLInputElement;
	const loginUserPassword = document.getElementById('loginUserPassword') as HTMLInputElement;

	let loginResponse = await backendService.loginUser(loginUserEmail.value, loginUserPassword.value);

	if (loginResponse == null) {
		alert('Wrong login information. Please try again.');
		return;
	}

	const loggedInUser = {
		email: loginUserEmail.value,
		id: loginResponse.id
	};

	localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));

	createLoginForm();
}

function createUserForm() {
	userFormContainer.innerHTML = /*html*/`
		<form id="createUserForm" class="user-form">
			<h1>Create user</h1>
			<label>
				<input type="name" id="createUserName" placeholder="Name">
			</label>
			<label>
				<input type="email" id="createUserEmail" placeholder="Email">
			</label>
			<label>
				<input type="password" id="createUserPassword" placeholder="Password">
			</label>
			<button type="submit">Create user</button>
			<button id="switchToLoginUserBtn">Already a member?</button>
		</form>
	`;

	const switchToLoginUserBtn = document.getElementById('switchToLoginUserBtn') as HTMLButtonElement;
	switchToLoginUserBtn.addEventListener('click', createLoginForm);

	const createUserForm = document.getElementById('createUserForm') as HTMLFormElement;
	createUserForm.addEventListener('submit', (ev) => {
		ev.preventDefault();
		createUser();
	});
}

async function createUser() {
	const createUserName = document.getElementById('createUserName') as HTMLInputElement;
	const createUserEmail = document.getElementById('createUserEmail') as HTMLInputElement;
	const createUserPassword = document.getElementById('createUserPassword') as HTMLInputElement;

	let userResponse = await backendService.addUser(createUserName.value, createUserEmail.value, createUserPassword.value);

	if (userResponse == null) {
		alert('Cannot create user.');
		return;
	}

	createLoginForm();
	
}