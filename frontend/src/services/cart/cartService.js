import { instance } from '@/lib/axios'

const cartSerivce = {
	getCart: async () => await instance.get('/cart'),
	getCartProducts: async () => await instance.get('/cart/products'),
	addProductToCart: async (payload) => await instance.post(`/cart`, payload),
	deleteProductFromCart: async ({ productId }) =>
		await instance.delete(`/cart/${productId}`),
	updateCartProduct: async ({ productId, quantity }) =>
		await instance.put(`/cart/${productId}`, { quantity }),
	deleteCart: async () => await instance.delete(`/cart`),
}

export { cartSerivce }
