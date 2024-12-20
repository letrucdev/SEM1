import { cartSerivce } from '@/services/cart/cartService'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateCartProduct = () => {
	const queryClient = useQueryClient()
	const { data, isPending, mutate, mutateAsync } = useMutation({
		mutationFn: cartSerivce.updateCartProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['cartProducts'] })
		},
	})

	const updateCartProductMutate = mutate
	const updateCartProductMutateAsync = mutateAsync
	const isPendingUpdateCartProduct = isPending
	const updateCartProductResponse = data?.data

	return {
		updateCartProductResponse,
		isPendingUpdateCartProduct,
		updateCartProductMutate,
		updateCartProductMutateAsync,
	}
}
