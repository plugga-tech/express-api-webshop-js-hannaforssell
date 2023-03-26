import '../scss/style.scss'
import { renderCart } from './cart';
import { getOrdersToDisplay } from './orderDisplay';
import { renderCategories, renderProducts } from './productDisplay';
import { createLoginForm } from './userPage';

createLoginForm();
renderCategories();
renderProducts();
renderCart();
getOrdersToDisplay();