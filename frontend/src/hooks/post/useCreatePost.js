import { postService } from '@/services/post/postService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useCreatePost = () => {
	const queryClient = useQueryClient()

	const { data, isPending, mutate, mutateAsync } = useMutation({
		mutationFn: postService.createPost,
		onSuccess: () => toast.success('Create post successfully!'),
		onSettled: () => queryClient.invalidateQueries({ queryKey: ['posts'] }),
	})

	const createPostResponse = data?.data?.data
	const isPendingCreatePost = isPending
	const createPostMutate = mutate
	const createPostMutateAsync = mutateAsync

	return {
		createPostResponse,
		isPendingCreatePost,
		createPostMutate,
		createPostMutateAsync,
	}
}
