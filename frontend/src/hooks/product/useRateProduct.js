import { productService } from '@/services/product/productService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useRateProduct = () => {
	const queryClient = useQueryClient()

	const { data, isPending, mutate, mutateAsync } = useMutation({
		mutationFn: productService.rateProduct,
		onSuccess: (_, { productId }) => {
			queryClient.invalidateQueries({ queryKey: ['product', productId] })
			toast.success('Rate product successfully!')
		},
		onSettled: () => queryClient.invalidateQueries({ queryKey: ['products'] }),
	})

	const rateProductResponse = data?.data
	const isPendingRateProduct = isPending
	const rateProductMutate = mutate
	const rateProductMutateAsync = mutateAsync

	return {
		rateProductResponse,
		isPendingRateProduct,
		rateProductMutate,
		rateProductMutateAsync,
	}
}
