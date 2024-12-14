import { instance } from '@/lib/axios'

const orderService = {
    getOrders: async () => await instance.get('/orders'),
    createOrder: async ({ cartId, ...payload }) =>
        await instance.post(`/orders/${cartId}`, payload),
}

export { orderService }
