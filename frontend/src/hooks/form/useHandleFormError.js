import { AxiosError, HttpStatusCode } from 'axios'

export const useHandleFormError = () => {
	const handleFormError = (error, form) => {
		console.log(error)
		if (error instanceof AxiosError) {
			const { response } = error
			if (response && response.status === HttpStatusCode.UnprocessableEntity) {
				for (const [field, error] of Object.entries(response.data.errors)) {
					form.setError(field, { message: error[0] })
				}
			}
		}
	}

	return { handleFormError }
}
