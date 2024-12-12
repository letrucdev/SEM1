import { userSerivce } from '@/services/user/userService'
import { useQuery } from '@tanstack/react-query'

export const useGetMe = ({ enabled }) => {
	const { data, isPending, refetch } = useQuery({
		queryKey: ['me'],
		queryFn: () => userSerivce.getMe,
		enabled,
	})

	const me = data?.data?.data
	const isPendingGetMe = isPending
	const refetchMe = refetch

	return {
		me,
		isPendingGetMe,
		refetchMe,
	}
}
