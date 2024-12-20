import { authService } from '@/services/auth/authService'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useResetPassword = () => {
	const { data, isPending, mutate, mutateAsync } = useMutation({
		mutationFn: (data) => authService.resetPassword(data),
		onSuccess: () => toast.success('Reset password successfully!'),
	})

	const resetPasswordResponse = data?.data
	const isPendingResetPassword = isPending
	const resetPasswordMutate = mutate
	const resetPasswordMutateAsync = mutateAsync

	return {
		resetPasswordResponse,
		isPendingResetPassword,
		resetPasswordMutate,
		resetPasswordMutateAsync,
	}
}
