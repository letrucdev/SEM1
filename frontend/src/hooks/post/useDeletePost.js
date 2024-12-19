import { postService } from '@/services/post/postService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useDeletePost = () => {
	const queryClient = useQueryClient()

	const { data, isPending, mutate, mutateAsync } = useMutation({
		mutationFn: postService.deletePost,
		onSuccess: () => toast.success('Delete post successfully!'),
		onSettled: () =>
			queryClient.invalidateQueries({
				queryKey: ['posts'],
			}),
	})

	const deletePostResponse = data?.data
	const isPendingDeletePost = isPending
	const deletePostMutate = mutate
	const deletePostMutateAsync = mutateAsync

	return {
		deletePostResponse,
		isPendingDeletePost,
		deletePostMutate,
		deletePostMutateAsync,
	}
}
