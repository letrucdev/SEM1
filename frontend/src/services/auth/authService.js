import { instance } from '@/lib/axios'

const authService = {
	login: async (payload) => await instance.post('/login', payload),
	register: async (payload) => await instance.post('/register', payload),
	forgotPassword: async (payload) =>
		await instance.post('/forgot-password', payload),
	resetPassword: async (payload) =>
		await instance.post(`/reset-password`, payload),
	csrfToken: async () => await instance.get('/sanctum/csrf-cookie'),
	logout: async () => await instance.post('/logout'),
}

export { authService }
