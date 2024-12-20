import { authService } from '@/services/auth/authService'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useRegister = () => {
	const { data, isPending, error, mutate, mutateAsync } = useMutation({
		mutationFn: (data) => authService.register(data),
		onSuccess: () => {
			toast.success('Sign up successfully!')
		},
	})

	const registerResponse = data?.data
	const isPendingRegister = isPending
	const registerError = error?.message || null
	const mutateRegister = mutate
	const mutateRegisterAsync = mutateAsync

	return {
		registerResponse,
		isPendingRegister,
		registerError,
		mutateRegister,
		mutateRegisterAsync,
	}
}
