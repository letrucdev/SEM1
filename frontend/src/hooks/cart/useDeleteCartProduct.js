import { cartSerivce } from '@/services/cart/cartService'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useDeleteCartProduct = () => {
	const queryClient = useQueryClient()
	const { data, isPending, mutate, mutateAsync } = useMutation({
		mutationFn: cartSerivce.deleteProductFromCart,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['cartProducts'] })
			queryClient.invalidateQueries({ queryKey: ['cart'] })
		},
	})

	const deleteCartProductResponse = data?.data
	const isPendingDeleteCartProduct = isPending
	const deleteCartProductMutate = mutate
	const deleteCartProductMutateAsync = mutateAsync

	return {
		deleteCartProductResponse,
		isPendingDeleteCartProduct,
		deleteCartProductMutate,
		deleteCartProductMutateAsync,
	}
}
