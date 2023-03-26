import { ICartItem } from './models/ICartItem';

export async function renderCart() {
	const cartContainer = document.getElementById('cartContainer') as HTMLDivElement;
	cartContainer.innerHTML = `<h2>Cart:</h2>`;

	const cart = JSON.parse(localStorage.getItem('cart') || '[]');

	for (const cartItem of cart) {
		cartContainer.innerHTML += /*html*/`
		<div>
			Name: ${cartItem.name}. Amount: ${cartItem.amount}
		</div>
		`;
	}
}