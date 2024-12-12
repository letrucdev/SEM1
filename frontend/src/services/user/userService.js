import { instance } from '@/lib/axios'

const userSerivce = {
	getMe: async () => await instance.get('/users/me'),
	chnagePassword: async () => await instance.put('/users/password'),
}

export { userSerivce }
