import { renderCart } from './cart';
import { IProduct } from './models/IProduct';
import * as backendService from './services/backendService'

const productContainer = document.getElementById('productContainer') as HTMLDivElement;
const categoriesList = document.getElementById('categoriesList') as HTMLSelectElement;

categoriesList.addEventListener('change', (ev) => {
	renderProducts(ev);
});

export async function renderCategories() {
	let categories = await backendService.getCategories();

	for (const category of categories) {
		categoriesList.innerHTML += /*html*/`
			<option id="${category.id}">${category.name}</option>
		`;
	}
}

export async function renderProducts(ev: Event | null = null) {
	let productsToDisplay: IProduct[];

	if (ev?.target != null) {
		const categoryId = (ev.target as HTMLSelectElement).selectedOptions[0].id;
		productsToDisplay = await backendService.getProductsByCategory(categoryId);
	} else {
		productsToDisplay = await backendService.getProducts();
	}

	productContainer.innerHTML = '';

	for (const product of productsToDisplay) {
		productContainer.innerHTML += /*html*/`
			<div id="${product.id}" class="product">
				<img src="/img/placeholder.jpg" alt="placeholder image" width="200">
				<h3 id="productName">${product.name}</h3>
				<p>Price: ${product.price}:-</p>
				<input type="number" id="productAmount" placeholder="1">
				<button id="addToCartBtn">Add to cart</button>
			</div>
		`;
	}

	addToCart();
}

function addToCart() {
	const productClasses = productContainer.getElementsByClassName('product') as HTMLCollectionOf<HTMLDivElement>;

	for (const productClass of productClasses) {
		const productName = productClass.querySelector('#productName') as HTMLInputElement;
		const productAmount = productClass.querySelector('#productAmount') as HTMLInputElement;
		const addToCartBtn = productClass.querySelector('#addToCartBtn') as HTMLButtonElement;
		addToCartBtn.addEventListener('click', (ev) => {
			ev.preventDefault();
			const amountOfProducts = Number(productAmount.value);

			const savedCart = JSON.parse(localStorage.getItem('cart') || '[]');

			savedCart.push({
				name: productName.innerHTML,
				quantity: amountOfProducts,
				productId: productClass.id
			});

			localStorage.setItem('cart', JSON.stringify(savedCart));

			renderCart();
		});
	}
}
