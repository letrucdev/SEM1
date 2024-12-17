import { DEFAULT_PAGINATION } from '@/constants'
import { orderService } from '@/services/order/orderService'
import { useQuery } from '@tanstack/react-query'

export const getUsersOrdersDefaultParams = {
	...DEFAULT_PAGINATION,
}

export const useGetUsersOrders = (params = getUsersOrdersDefaultParams) => {
	const { data, isPending, refetch } = useQuery({
		queryKey: ['usersOrders', params],
		queryFn: () => orderService.getUsersOrders(params),
	})

	const orders = data?.data?.data || []
	const orderTotal = data?.data?.total || 0
	const refetchUsersOrders = refetch
	const isPendingGetUsersOrders = isPending

	return {
		orders,
		orderTotal,
		isPendingGetUsersOrders,
		refetchUsersOrders,
	}
}
