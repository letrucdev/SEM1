import { instance } from '@/lib/axios'

const orderService = {
	getOrders: async (params) => await instance.get('/orders', { params }),
	getOrderStatuses: async () => await instance.get('/orders/statuses'),
	getUsersOrders: async (params) =>
		await instance.get(`/orders/users-orders`, { params }),
	createOrder: async ({ cartId, ...payload }) =>
		await instance.post(`/orders/${cartId}`, payload),
	cancelOrder: async ({ orderId }) =>
		await instance.patch(`/orders/cancel/${orderId}`),
	updateOrderStatus: async ({ orderId, status }) =>
		await instance.patch(`/orders/${orderId}/status`, { order_status: status }),
}

export { orderService }
