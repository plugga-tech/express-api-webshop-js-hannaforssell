import { ILoggedInUser } from "./models/ILoggedInUser";
import * as backendService from './services/backendService'

export function renderCart() {
	const cartContainer = document.getElementById('cartContainer') as HTMLDivElement;
	cartContainer.innerHTML = /*html*/`
		<h2>Cart:</h2>
	`;

	const cart = JSON.parse(localStorage.getItem('cart') || '[]');

	for (const cartItem of cart) {
		cartContainer.innerHTML += /*html*/`
		<div>
			Name: ${cartItem.name}. Amount: ${cartItem.quantity}
		</div>
		`;
	}

	cartContainer.innerHTML += '<button id="sendOrderBtn">Send order</button>';
	const sendOrderBtn = cartContainer.querySelector('#sendOrderBtn') as HTMLButtonElement;
	
	sendOrderBtn.addEventListener('click', (ev) => {
		ev.preventDefault();
		sendOrderFromCart();		
	});
}

async function sendOrderFromCart() {
	const cart = JSON.parse(localStorage.getItem('cart') || '[]');
	const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser') || '{}') as ILoggedInUser;

	for (const cartItem of cart) {
		delete cartItem.name;
	}

	let orderResponse = await backendService.addOrder(loggedInUser.id, cart);

	if (orderResponse == null) {
		alert('Something went wrong.');
		return;
	}
	
	alert('Your order was sent.');
	localStorage.removeItem('cart');
	renderCart();
}