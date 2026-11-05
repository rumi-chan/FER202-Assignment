import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:9999',
});

// Categories
export const getCategories = () => api.get('/categories').then((res) => res.data);

// Foods
export const getFoods = () => api.get('/foods').then((res) => res.data);
export const getFood = (id) => api.get(`/foods/${id}`).then((res) => res.data);
export const createFood = (food) => api.post('/foods', food).then((res) => res.data);
export const updateFood = (id, food) => api.put(`/foods/${id}`, food).then((res) => res.data);
export const deleteFood = (id) => api.delete(`/foods/${id}`);

// Orders
export const getOrders = () => api.get('/orders?_sort=id&_order=desc').then((res) => res.data);
export const createOrder = (order) => api.post('/orders', order).then((res) => res.data);
export const updateOrder = (id, data) => api.patch(`/orders/${id}`, data).then((res) => res.data);
export const deleteOrder = (id) => api.delete(`/orders/${id}`);

export default api;
