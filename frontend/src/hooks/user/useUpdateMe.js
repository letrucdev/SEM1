import { userSerivce } from '@/services/user/userService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useUpdateMe = () => {
	const queryClient = useQueryClient()

	const { isPending, data, mutate, mutateAsync } = useMutation({
		mutationFn: (data) => userSerivce.updateMe(data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['me'] })
			toast.success('Profile updated successfully!')
		},
	})

	const updateMeResponse = data?.data
	const isPendingUpdateMe = isPending
	const updateMeMutate = mutate
	const updateMeMutateAsync = mutateAsync

	return {
		updateMeResponse,
		isPendingUpdateMe,
		updateMeMutate,
		updateMeMutateAsync,
	}
}
