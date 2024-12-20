import { postService } from '@/services/post/postService'
import { useQuery } from '@tanstack/react-query'

export const useGetPostDetail = (postId) => {
	const { data, isPending, refetch } = useQuery({
		queryKey: ['post', postId],
		queryFn: () => postService.getPostDetail(postId),
	})

	const post = data?.data?.data
	const isPendingGetPostDetail = isPending
	const refetchPostDetail = refetch

	return {
		post,
		isPendingGetPostDetail,
		refetchPostDetail,
	}
}
