import { ILoggedInUser } from './models/ILoggedInUser';
import * as backendService from './services/backendService'

export function getOrdersToDisplay() {
	const orderContainer = document.getElementById('orderContainer') as HTMLDivElement;
	orderContainer.innerHTML = /*html*/`
		<button id="displayOrdersBtn">Display orders</button>
	`;

	const displayOrdersBtn = orderContainer.querySelector('#displayOrdersBtn') as HTMLButtonElement;
	displayOrdersBtn.addEventListener('click', (ev) => {
		ev.preventDefault();

		let adminToken = prompt("Please enter your token:") || '';

		renderOrders(adminToken);
	});
}

export async function renderOrders(adminToken: string) {
	const orderContainer = document.getElementById('orderContainer') as HTMLDivElement;

	const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}') as ILoggedInUser;
	
	let userOrders = await backendService.getOrdersForUser(loggedInUser.id, adminToken);

	for (const order of userOrders) {
		orderContainer.innerHTML += /*html*/`
			<div>${order.products}</div>
		`;
	}
}
