import { userSerivce } from '@/services/user/userService'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useChangePassword = () => {
	const { data, isPending, mutate, mutateAsync } = useMutation({
		mutationFn: userSerivce.chnagePassword,
		onSuccess: () => toast.success('Change password successfully!'),
	})

	const changePasswordResponse = data?.data
	const isPendingChangePassword = isPending
	const changePasswordMutate = mutate
	const changePasswordMutateAsync = mutateAsync

	return {
		changePasswordResponse,
		isPendingChangePassword,
		changePasswordMutate,
		changePasswordMutateAsync,
	}
}
