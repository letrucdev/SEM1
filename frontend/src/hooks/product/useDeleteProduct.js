import { productService } from '@/services/product/productService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useDeleteProduct = () => {
	const queryClient = useQueryClient()
	const { data, isPending, mutate, mutateAsync } = useMutation({
		mutationFn: productService.deleteProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['products'] })
			toast.success('Delete product successfully!')
		},
	})

	const deleteProductResponse = data?.data
	const isPendingDeleteProduct = isPending
	const deleteProductMutate = mutate
	const deleteProductMutateAsync = mutateAsync

	return {
		deleteProductResponse,
		isPendingDeleteProduct,
		deleteProductMutate,
		deleteProductMutateAsync,
	}
}
