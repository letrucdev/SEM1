import { productService } from '@/services/product/productService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useUpdateProduct = () => {
	const queryClient = useQueryClient()

	const { data, isPending, mutate, mutateAsync } = useMutation({
		mutationFn: productService.updateProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['products'] })
			toast.success('Product updated successfully!')
		},
	})

	const updateProductResponse = data?.data
	const isPendingUpdateProduct = isPending
	const updateProductMutate = mutate
	const updateProductMutateAsync = mutateAsync

	return {
		updateProductResponse,
		isPendingUpdateProduct,
		updateProductMutate,
		updateProductMutateAsync,
	}
}
