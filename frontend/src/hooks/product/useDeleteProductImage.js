import { productService } from '@/services/product/productService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useDeleteProductImage = () => {
	const queryClient = useQueryClient()
	const { isPending, data, mutate, mutateAsync } = useMutation({
		mutationFn: productService.deleteProductImage,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['products'] })
			toast.success('Delete product image successfully!')
		},
	})

	const isPendingDeleteProductImage = isPending
	const deleteProductImageMutate = mutate
	const deleteProductImageMutateAsync = mutateAsync
	const deleteProductImageResponse = data?.data

	return {
		deleteProductImageMutate,
		deleteProductImageMutateAsync,
		isPendingDeleteProductImage,
		deleteProductImageResponse,
	}
}
