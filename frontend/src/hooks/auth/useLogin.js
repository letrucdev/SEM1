import { useAuth } from '@/contexts/AuthProvider'
import { authService } from '@/services/auth/authService'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useLogin = () => {
	const { setUser } = useAuth()

	const { data, isPending, error, mutate, mutateAsync } = useMutation({
		mutationFn: (data) => authService.login(data),
		onSuccess: (data) => {
			setUser(data?.data?.data)
			toast.success('Sign in successfully!')
		},
	})

	const loginResponse = data?.data
	const isPendingLogin = isPending
	const loginError = error?.message || null
	const mutateLogin = mutate
	const mutateLoginAsync = mutateAsync

	return {
		loginResponse,
		isPendingLogin,
		loginError,
		mutateLogin,
		mutateLoginAsync,
	}
}
