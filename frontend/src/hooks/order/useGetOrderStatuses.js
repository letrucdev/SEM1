import { orderService } from '@/services/order/orderService'
import { useQuery } from '@tanstack/react-query'

export const useGetOrderStatuses = () => {
	const { data, isPending, refetch } = useQuery({
		queryKey: ['orderStatuses'],
		queryFn: () => orderService.getOrderStatuses(),
	})

	const orderStatuses = data?.data?.data || {}
	const isPendingGetOrderStatuses = isPending
	const refetchOrderStatuses = refetch

	return {
		orderStatuses,
		isPendingGetOrderStatuses,
		refetchOrderStatuses,
	}
}
