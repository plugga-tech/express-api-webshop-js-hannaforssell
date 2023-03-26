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

	if (userOrders == null) {
		alert('Incorrect token.');
		return;
	}

	let i = 1;

	for (const order of userOrders) {
		console.log(order);
		
		
		orderContainer.innerHTML += /*html*/`
			<div>Order: ${i}
		`;

		for (const product of order.products) {
			orderContainer.innerHTML += /*html*/`
			${product.quantity} of id: ${product.productId}<br>
		`;
		}

		orderContainer.innerHTML += /*html*/`</div>`;

		i++;
	}
}
