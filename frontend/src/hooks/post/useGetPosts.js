import { DEFAULT_PAGINATION } from '@/constants'
import { postService } from '@/services/post/postService'
import { useQuery } from '@tanstack/react-query'

export const getPostsDefaultParams = {
	...DEFAULT_PAGINATION,
	postType: '',
	search: '',
}

export const useGetPosts = (params = getPostsDefaultParams) => {
	const { data, isPending, refetch } = useQuery({
		queryKey: ['posts', params],
		queryFn: () => postService.getPosts(params),
	})

	const posts = data?.data?.data || []
	const postTotal = data?.data?.total || 0
	const isPendingGetPosts = isPending

	return { posts, postTotal, isPendingGetPosts, refetch }
}
