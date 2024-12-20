import { orderService } from '@/services/order/orderService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useCancelOrder = () => {
	const queryClient = useQueryClient()
	const { data, isPending, mutate, mutateAsync } = useMutation({
		mutationFn: orderService.cancelOrder,
		onSuccess: () => {
			toast.success('Order canceled successfully!')
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['orders'] })
		},
	})

	const cancelOrderResponse = data?.data
	const isPendingCancelOrder = isPending
	const cancelOrderMutate = mutate
	const cancelOrderMutateAsync = mutateAsync

	return {
		cancelOrderResponse,
		isPendingCancelOrder,
		cancelOrderMutate,
		cancelOrderMutateAsync,
	}
}
