import axios from 'axios';
import { IUser } from '../models/IUser';
import { IProduct } from '../models/IProduct';
import { ICategory } from '../models/ICategory';
import { IOrder } from '../models/IOrder';
import { IIdResponse } from '../models/IIdResponse';

const BASE_URL = `http://localhost:3000/api`;

// >>>>>>>> USERS

export async function getUsers(): Promise<IUser[]> {
    return axios({
        method: 'get',
        url: BASE_URL + '/users'
    }).then((data) => {
        return data.data;
    }).catch(() => {
        return {}
    });
}

export async function getUser(id: string): Promise<IUser> {
    return axios({
        method: 'post',
        url: BASE_URL + '/users',
		data: {
			id: id
		}
    }).then((data) => {
        return data.data;
    }).catch(() => {
        return {}
    });
}

export async function addUser(name: string, email: string, password: string): Promise<IIdResponse> {
    return axios({
        method: 'post',
        url: BASE_URL + '/users/add',
		data: {
			name: name,
			email: email,
			password: password
		}
    }).then((data) => {
        return data.data;
    }).catch(() => {
        return null;
    });
}

export async function loginUser(email: string, password: string): Promise<IIdResponse> {
    return axios({
        method: 'post',
        url: BASE_URL + '/users/login',
		data: {
			email: email,
			password: password
		}
    }).then((data) => {	
        return data.data;
    }).catch(() => {
        return null;
    });
}

// >>>>>>>> PRODUCTS

export async function getProducts(): Promise<IProduct[]> {
    return axios({
        method: 'get',
        url: BASE_URL + '/products'
    }).then((data) => {
        return data.data;
    }).catch(() => {
        return {}
    });
}

export async function getProduct(id: string): Promise<IProduct> {
    return axios({
        method: 'get',
        url: BASE_URL + `/products/${id}`
    }).then((data) => {
        return data.data;
    }).catch(() => {
        return {}
    });
}

export async function addProduct(
	name: string,
	description: string,
	price: number,
	lager: number,
	category: string,
	token: string
	): Promise<IIdResponse> {
    return axios({
        method: 'post',
        url: BASE_URL + '/users/add',
		data: {
			name: name,
			description: description,
			price: price,
			lager: lager,
			category: category,
			token: token
		}
    }).then((data) => {
        return data.data;
    }).catch(() => {
        return {}
    });
}

export async function getProductsByCategory(categoryId: string): Promise<IProduct[]> {
    return axios({
        method: 'get',
        url: BASE_URL + `/products/category/${categoryId}`
    }).then((data) => {
        return data.data;
    }).catch(() => {
        return {}
    });
}

// >>>>>>>> CATEGORIES

export async function addCategory(name: string, token: string): Promise<IIdResponse> {
    return axios({
        method: 'post',
        url: BASE_URL + '/categories/add',
		data: {
			name: name,
			token: token
		}
    }).then((data) => {
        return data.data;
    }).catch(() => {
        return {}
    });
}

export async function getCategories(): Promise<ICategory[]> {
    return axios({
        method: 'get',
        url: BASE_URL + '/categories'
    }).then((data) => {
        return data.data;
    }).catch(() => {
        return {}
    });
}

// >>>>>>>> ORDERS

export async function getOrders(token: string): Promise<IOrder[]> {
    return axios({
        method: 'get',
        url: BASE_URL + `/orders/all/${token}`
    }).then((data) => {
        return data.data;
    }).catch(() => {
        return {}
    });
}

export async function addOrder(user: string, products: object[]): Promise<IIdResponse> {
    return axios({
        method: 'post',
        url: BASE_URL + '/orders/add',
		data: {
			user: user,
			products: products
		}
    }).then((data) => {
        return data.data;
    }).catch(() => {
        return null;
    });
}

export async function getOrdersForUser(user: string, token: string): Promise<IOrder[]> {
    return axios({
        method: 'post',
        url: BASE_URL + '/orders/user',
		data: {
			user: user,
			token: token
		}
    }).then((data) => {
        return data.data;
    }).catch(() => {
        return null;
    });
}
