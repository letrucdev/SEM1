import { orderService } from '@/services/order/orderService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useUpdateOrderStatus = () => {
	const queryClient = useQueryClient()

	const { data, isPending, mutate, mutateAsync } = useMutation({
		mutationFn: orderService.updateOrderStatus,
		onSuccess: () => toast.success('Order status updated successfully'),
		onSettled: () =>
			queryClient.invalidateQueries({ queryKey: ['usersOrders'] }),
	})

	const updateOrderStatusMutate = mutate
	const updateOrderStatusMutateAsync = mutateAsync
	const isPendingUpdateOrderStatus = isPending
	const updateOrderStatusResponse = data?.data?.data || {}

	return {
		updateOrderStatusMutate,
		updateOrderStatusMutateAsync,
		isPendingUpdateOrderStatus,
		updateOrderStatusResponse,
	}
}
