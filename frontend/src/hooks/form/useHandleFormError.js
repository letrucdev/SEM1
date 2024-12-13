import { AxiosError, HttpStatusCode } from 'axios'

export const useHandleFormError = () => {
	const handleFormError = (error, form) => {
		if (
			error instanceof AxiosError &&
			error.response &&
			error.response.status === HttpStatusCode.UnprocessableEntity
		) {
			console.log(error)
			for (const [field, errors] of Object.entries(
				error.response.data.errors
			)) {
				form.setError(field, { message: errors[0] })
			}
		}
	}

	return { handleFormError }
}
