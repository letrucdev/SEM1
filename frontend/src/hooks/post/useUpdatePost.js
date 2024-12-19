import { postService } from '@/services/post/postService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useUpdatePost = () => {
	const queryClient = useQueryClient()

	const { data, isPending, mutate, mutateAsync } = useMutation({
		mutationFn: postService.updatePost,
		onSuccess: () => toast.success('Update post successfully!'),
		onSettled: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
	})

	const updatePostResponse = data?.data
	const isPendingUpdatePost = isPending
	const updatePostMutate = mutate
	const updatePostMutateAsync = mutateAsync

	return {
		updatePostResponse,
		isPendingUpdatePost,
		updatePostMutate,
		updatePostMutateAsync,
	}
}
