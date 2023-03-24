const userForm = document.getElementById('userForm') as HTMLFormElement;

export function loginUser() {
	userForm.innerHTML = /*html*/`
		<h1>Log in</h1>
		<label>
			<input type="email" id="userLoginEmail" placeholder="Email">
		</label>
		<label>
			<input type="password" id="userLoginPassword" placeholder="Password">
		</label>
		<button id="createUserBtn">Not a member yet?</button>
		<button type="submit">Log in</button>
	`;

	const createUserBtn = document.getElementById('createUserBtn') as HTMLButtonElement;
	createUserBtn.addEventListener('click', createUser);
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
	loginUserBtn.addEventListener('click', loginUser);
}