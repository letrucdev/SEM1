const { instance } = require('@/lib/axios')

const productService = {
	getProducts: async (params) => await instance.get('/products', { params }),
	getProductCategories: async () => await instance.get('/products/categories'),
}

export { productService }
