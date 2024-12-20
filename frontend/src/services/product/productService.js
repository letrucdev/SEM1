import { instance } from '@/lib/axios'

const productService = {
	getProducts: async (params) => await instance.get('/products', { params }),

	getProductDetail: async (productId) =>
		await instance.get(`/products/${productId}`),

	getProductCategories: async () => await instance.get('/products/categories'),

	createProductCategory: async (payload) =>
		await instance.post('/products/category', payload),

	createProduct: async (payload) => {
		const formData = new FormData()
		for (const key in payload) {
			if (payload[key]) {
				if ((typeof payload[key] === 'object', Array.isArray(payload[key]))) {
					payload[key].forEach((item) => {
						formData.append(`${key}[]`, item)
					})
				} else {
					formData.append(key, payload[key])
				}
			}
		}

		return await instance.post('/products', formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		})
	},

	updateProduct: async ({ productId, ...payload }) => {
		const formData = new FormData()
		for (const key in payload) {
			if (payload[key]) {
				if ((typeof payload[key] === 'object', Array.isArray(payload[key]))) {
					payload[key].forEach((item) => {
						formData.append(`${key}[]`, item)
					})
				} else {
					formData.append(key, payload[key])
				}
			}
		}

		return await instance.post(`/products/${productId}`, formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		})
	},

	rateProduct: async ({ productId, star }) =>
		await instance.post(`/products/${productId}/rate`, { star }),

	deleteProduct: async (productId) =>
		await instance.delete(`/products/${productId}`),

	deleteProductImage: async ({ productId, imageId }) =>
		await instance.delete(`/products/${productId}/${imageId}`),
}

export { productService }
