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

	for (const prod of productsToDisplay) {
		productContainer.innerHTML += /*html*/`
			<div class="product">
				<img src="/img/placeholder.jpg" alt="placeholder image" width="200">
				<h3>${prod.name}</h3>
				<p>Price: ${prod.price}:-</p>
				<input type="number" placeholder="0">
				<button>Add to cart</button>
			</div>
		`;
	}
}


// todo: add a 'select all' and display all categories