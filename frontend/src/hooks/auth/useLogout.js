import { authService } from '@/services/auth/authService'
import { useMutation } from '@tanstack/react-query'

export const useLogout = () => {
	const { mutateAsync, mutate, isPending } = useMutation({
		mutationFn: authService.logout,
		onSettled: () => {
			location.href = '/'
		},
	})

	const logoutMutateAsync = mutateAsync
	const logoutMutate = mutate
	const isPendingLogout = isPending

	return { logoutMutateAsync, logoutMutate, isPendingLogout }
}
