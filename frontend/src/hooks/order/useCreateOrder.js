import { orderService } from '@/services/order/orderService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useCreateOrder = () => {
	const queryClient = useQueryClient()
	const { data, isPending, mutate, mutateAsync } = useMutation({
		mutationFn: orderService.createOrder,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['orders'] })
			queryClient.invalidateQueries({ queryKey: ['cart'] })
			queryClient.invalidateQueries({ queryKey: ['cartProducts'] })
			toast.success('Place order successfully!')
		},
	})

	const createOrderResponse = data?.data
	const isPendingCreateOrder = isPending
	const createOrderMutate = mutate
	const createOrderMutateAsync = mutateAsync

	return {
		createOrderResponse,
		isPendingCreateOrder,
		createOrderMutate,
		createOrderMutateAsync,
	}
}
