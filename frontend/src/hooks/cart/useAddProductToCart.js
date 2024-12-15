import { cartSerivce } from '@/services/cart/cartService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useAddProductToCart = () => {
	const queryClient = useQueryClient()
	const { data, isPending, mutate, mutateAsync } = useMutation({
		mutationFn: cartSerivce.addProductToCart,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['cart'] })
			queryClient.invalidateQueries({ queryKey: ['cartProducts'] })
			toast.success('Product added to cart successfully!')
		},
	})

	const addProductToCartResponse = data?.data
	const isPendingAddProductToCart = isPending
	const addProductToCartMutate = mutate
	const addProductToCartMutateAsync = mutateAsync

	return {
		addProductToCartResponse,
		isPendingAddProductToCart,
		addProductToCartMutate,
		addProductToCartMutateAsync,
	}
}
