import axios from 'axios'
import { config } from './config'

const NEED_AUTH_PATH = ['/login', '/register']

const instance = axios.create({
	baseURL: config.apiUrl,
	headers: {
		Accept: 'application/json',
	},
	withCredentials: true,
	withXSRFToken: true,
})

instance.interceptors.request.use((config) => {
	if (config.url.startsWith('/sanctum')) {
		config.baseURL = config.baseURL.replace('/api', '')
	}

	if (NEED_AUTH_PATH.includes(config.url)) {
		config.headers.Authorization = `Bearer ${localStorage.getItem(
			'access_token'
		)}`
	}

	return config
})

instance.interceptors.response.use(
	(response) => response,
	(error) => {
		throw error
	}
)

export { instance }
