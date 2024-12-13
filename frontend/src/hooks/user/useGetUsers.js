import { DEFAULT_PAGINATION } from '@/constants'
import { userSerivce } from '@/services/user/userService'
import { useQuery } from '@tanstack/react-query'

export const getUsersDefaultParams = {
	...DEFAULT_PAGINATION,
}
export const useGetUsers = (params = getUsersDefaultParams) => {
	const { data, isPending, refetch } = useQuery({
		queryKey: ['users', params],
		queryFn: () => userSerivce.getUsers(params),
	})

	const users = data?.data?.data || []
	const userTotal = data?.data?.total || 0
	const isPendingGetUsers = isPending
	const refetchUsers = refetch

	return {
		users,
		userTotal,
		isPendingGetUsers,
		refetchUsers,
	}
}
