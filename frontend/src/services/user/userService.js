import { instance } from '@/lib/axios'

const userSerivce = {
	getMe: async () => await instance.get('/users/me'),
	updateMe: async (payload) => await instance.post('/users/me', payload),
	chnagePassword: async (payload) =>
		await instance.put('/users/me/password', payload),
	getUsers: async (params) => await instance.get('/users', { params }),
}

export { userSerivce }
