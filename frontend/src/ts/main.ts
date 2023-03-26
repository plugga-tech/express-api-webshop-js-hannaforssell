import '../scss/style.scss'
import { renderCart } from './cart';
import { getOrdersToDisplay } from './orderDisplay';
import { renderCategories, renderProducts } from './productDisplay';
import { createLoginForm } from './userPage';

//let users = await backendService.getUsers();
//let user = await backendService.getUser(users[1].id);
//let newUser = await backendService.addUser('name', 'majl', 'password');
//let loggedInUser = await backendService.loginUser('test@mail.com', 'test');


// >>>>>>>>>>>>>>>>>>>>>

//let products = await backendService.getProducts();
//let product = await backendService.getProduct('641c21a6e957235f2fe763c3');
//let productCategory = await backendService.getProductsByCategory('641c208fd0d8cf287603713a');

// >>>>>>>>>>>>>>>>>>>>>

//let newCategory = await backendService.addCategory('prod1', 'asd');
//let categories = await backendService.getCategories();

// >>>>>>>>>>>>>>>>>>>>>
//let prodList = [
// 	{
// 		"productId": "641c21a6e957235f2fe763c3",
// 		"quantity": 1
// 	  },
// 	  {
// 		"productId": "641c21ace957235f2fe763c4",
// 		"quantity": 1
// 	  }
// ]

//let orders = await backendService.getOrders('asd');
//let newOrder = await backendService.addOrder('641c21c4e957235f2fe763c5', prodList);
//let order = await backendService.getOrdersForUser('641c21c4e957235f2fe763c5', 'asd');

//console.log();

createLoginForm();
renderCategories();
renderProducts();
renderCart();
getOrdersToDisplay();