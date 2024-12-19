import { instance } from '@/lib/axios'

const postService = {
	getPosts: async (params) => await instance.get('/posts', { params }),

	getPostDetail: async (postId) => await instance.get(`/posts/${postId}`),

	createPost: async (payload) => {
		const formData = new FormData()
		for (const key in payload) {
			if (payload[key]) {
				formData.append(key, payload[key])
			}
		}

		return await instance.post('/posts', formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		})
	},

	updatePost: async ({ postId, ...payload }) => {
		const formData = new FormData()
		for (const key in payload) {
			if (payload[key]) {
				formData.append(key, payload[key])
			}
		}

		return await instance.post(`/posts/${postId}`, formData, {
			headers: { 'Content-Type': 'multipart/form-data' },
		})
	},

	deletePost: async (postId) => await instance.delete(`/posts/${postId}`),
}

export { postService }
