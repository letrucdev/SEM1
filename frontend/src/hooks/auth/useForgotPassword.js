import { authService } from '@/services/auth/authService'
import { useMutation } from '@tanstack/react-query'

export const useForgotPassword = () => {
	const { mutate, mutateAsync, isPending, data } = useMutation({
		mutationFn: (data) => authService.forgotPassword(data),
	})

	const forgotPasswordMutate = mutate
	const forgotPasswordMutateAsync = mutateAsync
	const isPendingForgotPassword = isPending
	const forgotPasswordResponse = data?.data

	return {
		forgotPasswordMutate,
		forgotPasswordMutateAsync,
		isPendingForgotPassword,
		forgotPasswordResponse,
	}
}
