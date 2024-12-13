import axios, { AxiosError, HttpStatusCode } from 'axios'
import { config } from './config'
import { toast } from 'sonner'

const NO_AUTH_PATH = ['/login', '/register']

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

	/* 	if (!NO_AUTH_PATH.includes(config.url)) {
		config.headers.Authorization = `Bearer ${localStorage.getItem(
			'access_token'
		)}`
	} */

	return config
})

instance.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error instanceof AxiosError && error.response) {
			if (error.response.status === HttpStatusCode.Unauthorized) {
				localStorage.removeItem('user')
				location.href = '/'
			} else if (error.response.status !== HttpStatusCode.UnprocessableEntity) {
				toast.error(error.message)
			}
		} else {
			toast.error('Unexpected error occurred. Please try again later.')
		}

		throw error
	}
)

export { instance }
