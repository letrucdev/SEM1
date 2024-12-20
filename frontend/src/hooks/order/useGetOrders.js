import { DEFAULT_PAGINATION } from '@/constants'
import { orderService } from '@/services/order/orderService'
import { useQuery } from '@tanstack/react-query'

const getOrdersDefaultParams = {
	...DEFAULT_PAGINATION,
}

export const useGetOrders = (params = getOrdersDefaultParams) => {
	const { data, isPending, refetch } = useQuery({
		queryKey: ['orders', params],
		queryFn: () => orderService.getOrders(params),
	})

	const orders = data?.data?.data || []
	const orderTotal = data?.data?.total || 0
	const isPendingGetOrders = isPending
	const refetchOrders = refetch

	return {
		orders,
		orderTotal,
		isPendingGetOrders,
		refetchOrders,
	}
}
